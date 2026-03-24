import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfessorHome = () => {
  const [professorData, setProfessorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    loadProfessorData();
  }, []);

  const loadProfessorData = async () => {
    try {
      setLoading(true);
      
      // Get email from navigation state or localStorage
      let email = location.state?.user?.email;
      if (!email) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            const user = JSON.parse(storedUser);
            email = user.email;
          } catch (e) {
            console.error('Failed to parse stored user', e);
          }
        }
      }

      if (!email) {
        console.log('❌ No email found, redirecting to login');
        navigate('/professor/login');
        return;
      }

      // Fetch complete profile from backend
      console.log('🔍 Fetching complete profile for email:', email);
      const fullData = await fetchCompleteProfile(email);
      
      if (fullData) {
        console.log('✅ Received full professor data:', fullData);
        const formattedData = formatProfessorData(fullData);
        setProfessorData(formattedData);
        // Save complete data to localStorage
        localStorage.setItem('professorData', JSON.stringify(formattedData));
        localStorage.setItem('user', JSON.stringify(fullData));
      } else {
        const storedData = localStorage.getItem('professorData');
        if (storedData) {
          setProfessorData(JSON.parse(storedData));
        } else {
          navigate('/professor/login');
        }
      }
    } catch (error) {
      console.error('Error loading professor data:', error);
      navigate('/professor/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchCompleteProfile = async (email) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(
        `http://localhost:5000/api/professor/profile/${email}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.success) {
        return response.data.data;
      } else {
        console.error('API returned success: false', response.data);
        return null;
      }
    } catch (error) {
      console.error('❌ Failed to fetch profile:', error.response?.data || error.message);
      return null;
    }
  };

  const formatProfessorData = (data) => {
    // Format dates
    let joiningDate = 'Not available';
    if (data.joiningDate) {
      try {
        const date = new Date(data.joiningDate);
        if (!isNaN(date.getTime())) {
          joiningDate = date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });
        }
      } catch (e) { /* ignore */ }
    }
    
    let lastLogin = 'Never logged in';
    if (data.lastLogin) {
      try {
        const date = new Date(data.lastLogin);
        if (!isNaN(date.getTime())) {
          lastLogin = date.toLocaleString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
        }
      } catch (e) { /* ignore */ }
    }
    
    const professorId = data.id || data._id || 'N/A';
    
    // Extract department info
    let departmentName = 'Not specified';
    let departmentCode = '';
    let departmentDescription = '';
    if (data.department) {
      if (typeof data.department === 'object') {
        departmentName = data.department.name || 'Not specified';
        departmentCode = data.department.code || '';
        departmentDescription = data.department.description || '';
      } else if (typeof data.department === 'string') {
        departmentName = data.department;
      }
    }

    // Generate display ID
    let displayId = 'N/A';
    if (professorId !== 'N/A' && departmentCode) {
      const lastTwoHex = professorId.toString().slice(-2);
      const lastTwoDecimal = parseInt(lastTwoHex, 16) % 100;
      const numberPart = lastTwoDecimal.toString().padStart(2, '0');
      displayId = `${departmentCode}${numberPart}`.toUpperCase();
    } else if (professorId !== 'N/A') {
      displayId = professorId.toString().slice(-6).toUpperCase();
    }

    // Format courses
    const coursesTaught = data.coursesTaught || [];
    const formattedCourses = coursesTaught.map(course => ({
      id: course._id,
      name: course.name,
      code: course.code,
      credits: course.credits || 3,
      semester: course.semester || 'N/A',
      description: course.description || ''
    }));

    return {
      id: professorId,
      displayId,
      name: data.name || 'Professor',
      email: data.email || '',
      contactNumber: data.contactNumber || 'Not provided',
      department: departmentName,
      departmentCode: departmentCode,
      departmentDescription: departmentDescription,
      qualification: data.qualification || 'Not specified',
      experience: data.experience || 0,
      specialization: data.specialization || 'Not specified',
      joiningDate,
      lastLogin,
      isActive: data.isActive === true,
      statusText: data.isActive === true ? 'Active' : 'Inactive',
      profilePicture: data.profilePicture || null,
      coursesCount: formattedCourses.length,
      coursesTaught: formattedCourses,
      stats: data.stats || {}
    };
  };

  const navigateToAttendance = () => navigate('/professor/attendance');
  const navigateToSyllabus = () => navigate('/professor/syllabus');
  const navigateToAssignments = () => navigate('/professor/assignments');
  const handleLogout = () => {
    localStorage.clear();
    navigate('/signin');
  };
  const navigateToChangePassword = () => navigate('/professor/change-password');

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading professor dashboard...</p>
        </div>
      </div>
    );
  }

  if (!professorData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Session expired. Please login again.</p>
          <button 
            onClick={() => navigate('/signin')}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 cursor-pointer"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {professorData.name}
          </h1>
          <p className="text-gray-600 mt-2">
            {professorData.department} Department • Professor ID: {professorData.displayId}
          </p>
        </div>

        <div className='flex gap-2'>
          <button
            onClick={navigateToChangePassword}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 cursor-pointer"
          >
            Change Password
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-950 text-white p-8 rounded-xl shadow-lg mb-8">
        <div className="flex items-center space-x-6">
          <div className="bg-white text-purple-600 rounded-full w-24 h-24 flex items-center justify-center text-4xl font-bold">
            {professorData.name?.charAt(0)}
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold">{professorData.name}</h2>
            <p className="text-purple-100 mt-1">{professorData.email}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div>
                <p className="text-purple-200 text-sm">Professor ID</p>
                <p className="font-semibold">{professorData.displayId}</p>
              </div>
              <div>
                <p className="text-purple-200 text-sm">Department</p>
                <p className="font-semibold">{professorData.department}</p>
              </div>
              <div>
                <p className="text-purple-200 text-sm">Status</p>
                <p className="font-semibold">{professorData.statusText}</p>
              </div>
              <div>
                <p className="text-purple-200 text-sm">Experience</p>
                <p className="font-semibold">{professorData.experience} years</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'courses'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Subject ({professorData.coursesCount})
          </button>
          <button
            onClick={() => setActiveTab('professional')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'professional'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Professional Details
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">👤 Personal Information</h3>
            <div className="space-y-3">
              <InfoItem label="Full Name" value={professorData.name} />
              <InfoItem label="Email Address" value={professorData.email} />
              <InfoItem label="Contact Number" value={professorData.contactNumber} />
              <InfoItem label="Joining Date" value={professorData.joiningDate} />
              <InfoItem label="Last Login" value={professorData.lastLogin} />
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">🎓 Academic Information</h3>
            <div className="space-y-3">
              <InfoItem label="Qualification" value={professorData.qualification} />
              <InfoItem label="Specialization" value={professorData.specialization} />
              <InfoItem label="Years of Experience" value={`${professorData.experience} years`} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'courses' && (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">📚 Courses Taught</h3>
          {professorData.coursesTaught.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No courses assigned yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {professorData.coursesTaught.map((course, index) => (
                <CourseCard key={course.id || index} course={course} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'professional' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">💼 Professional Details</h3>
            <div className="space-y-3">
              <InfoItem label="Qualification" value={professorData.qualification} />
              <InfoItem label="Specialization" value={professorData.specialization} />
              <InfoItem label="Experience" value={`${professorData.experience} years`} />
              <InfoItem label="Joining Date" value={professorData.joiningDate} />
              <InfoItem label="Status" value={professorData.statusText} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">🔐 Account Information</h3>
            <div className="space-y-3">
              <InfoItem label="Account Status" value={professorData.isActive ? 'Active' : 'Inactive'} />
              <InfoItem label="Last Login" value={professorData.lastLogin} />
              <InfoItem label="Account Created" value={new Date().toLocaleDateString()} />
            </div>
          </div>


        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <ActionCard title="Attendance" description="Mark and manage student attendance" icon="📋" color="from-blue-500 to-blue-700" onClick={navigateToAttendance} />
        <ActionCard title="Syllabus" description="View and manage course syllabus" icon="📚" color="from-green-500 to-green-700" onClick={navigateToSyllabus} />
        <ActionCard title="Assignments" description="Create and grade assignments" icon="📝" color="from-orange-500 to-orange-700" onClick={navigateToAssignments} />
      </div>
    </div>
  );
};

// Helper Components
const InfoItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100">
    <span className="text-gray-500 text-sm font-medium">{label}:</span>
    <span className="font-medium text-gray-800">{value || 'N/A'}</span>
  </div>
);

const StatBox = ({ title, value, icon }) => (
  <div className="bg-gray-50 p-3 rounded-lg text-center">
    <div className="text-2xl mb-1">{icon}</div>
    <p className="text-xs text-gray-500">{title}</p>
    <p className="text-lg font-bold text-gray-800">{value}</p>
  </div>
);

const CourseCard = ({ course }) => (
  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-2">
      <h4 className="font-semibold text-gray-800">{course.name}</h4>
      <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
        {course.code}
      </span>
    </div>

    {course.description && (
      <p className="text-xs text-gray-500 mt-2">{course.description}</p>
    )}
  </div>
);


const ActionCard = ({ title, description, icon, color, onClick }) => (
  <div 
    onClick={onClick} 
    className={`bg-gradient-to-r ${color} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer`}
  >
    <div className="text-4xl mb-3">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-white text-opacity-90 text-sm">{description}</p>
  </div>
);

export default ProfessorHome;