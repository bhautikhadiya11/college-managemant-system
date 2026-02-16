import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfessorHome = () => {
  const [professorData, setProfessorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    loadProfessorData();
  }, []);

  const loadProfessorData = async () => {
    try {
      setLoading(true);
      
      // 1. Get email from navigation state or localStorage
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

      // 2. Fetch complete profile from backend using email
      console.log('🔍 Fetching complete profile for email:', email);
      const fullData = await fetchCompleteProfile(email);
      
      if (fullData) {
        console.log('✅ Received full professor data:', fullData);
        const formattedData = formatProfessorData(fullData);
        setProfessorData(formattedData);
        // Save complete data to localStorage for future visits
        localStorage.setItem('professorData', JSON.stringify(formattedData));
        localStorage.setItem('user', JSON.stringify(fullData));
      } else {
        // If fetch fails, try to use what we have in localStorage as fallback
        const storedData = localStorage.getItem('professorData');
        if (storedData) {
          setProfessorData(JSON.parse(storedData));
        } else {
          navigate('/professor/login');
        }
      }
    } catch (error) {
      console.error(' Error loading professor data:', error);
      navigate('/professor/login');
    } finally {
      setLoading(false);
    }
  };

  // Fetch complete profile from backend
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

  // Format professor data
  const formatProfessorData = (data) => {
    // Format joining date
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
    
    // Format last login
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
    const displayId = professorId !== 'N/A' 
      ? professorId.toString().slice(-6).toUpperCase() 
      : 'N/A';

    return {
      id: professorId,
      displayId,
      name: data.name || 'Professor',
      email: data.email || '',
      department: data.department || 'Not specified',
      designation: data.designation || 'Professor',
      contactNumber: data.contactNumber || 'Not provided',
      joiningDate,
      lastLogin,
      isActive: data.isActive === true,
      statusText: data.isActive === true ? 'Active' : 'Inactive',
      profilePicture: data.profilePicture || null,
      coursesCount: data.coursesTaught?.length || 0,
      coursesTaught: data.coursesTaught || [],
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
            {professorData.designation} • {professorData.department} Department
          </p>
        </div>

        <div className='flex gap-2 justify-between items-center'>
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

      {/* Profile Card */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-950 text-white p-8 rounded-xl shadow-lg mb-8">
        <div className="flex items-center space-x-6">
          <div className="bg-white text-purple-600 rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold">
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
                <p className="text-purple-200 text-sm">Designation</p>
                <p className="font-semibold">{professorData.designation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <ActionCard title="Attendance" description="Mark and manage student attendance" icon="📋" color="from-blue-500 to-blue-700" onClick={navigateToAttendance} />
        <ActionCard title="Syllabus" description="View and manage course syllabus" icon="📚" color="from-green-500 to-green-700" onClick={navigateToSyllabus} />
        <ActionCard title="Assignments" description="Create and grade assignments" icon="📝" color="from-orange-500 to-orange-700" onClick={navigateToAssignments} />
      </div>

      {/* Info Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">📋 Professional Information</h3>
          <div className="space-y-3">
            <InfoItem label="Professor ID" value={professorData.displayId} />
            <InfoItem label="Department" value={professorData.department} />
            <InfoItem label="Designation" value={professorData.designation} />
            <InfoItem label="Joining Date" value={professorData.joiningDate} />
            <InfoItem label="Status" value={professorData.statusText} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">👤 Personal Details</h3>
          <div className="space-y-3">
            <InfoItem label="Full Name" value={professorData.name} />
            <InfoItem label="Email" value={professorData.email} />
            <InfoItem label="Contact" value={professorData.contactNumber} />
            <InfoItem label="Last Login" value={professorData.lastLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const InfoItem = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-500 text-sm">{label}:</span>
    <span className="font-medium text-gray-800 bg-gray-50 px-3 py-1 rounded-lg">
      {value || 'N/A'}
    </span>
  </div>
);

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
      <div className={`${color} text-white p-3 rounded-lg text-2xl`}>{icon}</div>
    </div>
  </div>
);

const ActionCard = ({ title, description, icon, color, onClick }) => (
  <div onClick={onClick} className={`bg-gradient-to-r ${color} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer`}>
    <div className="text-4xl mb-3">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-white text-opacity-90 text-sm">{description}</p>
  </div>
);

export default ProfessorHome;