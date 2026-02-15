import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentHome = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = async () => {
    try {
      setLoading(true);
      
      // Step 1: Navigation state se data check karo (pehli baar)
      if (location.state?.user) {
        console.log('📦 Loading from navigation state:', location.state.user);
        const userData = location.state.user;
        
        // Save to localStorage for future visits
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Fetch complete profile with semester
        await fetchCompleteProfile(userData.enrollmentNum);
        return;
      }
      
      // Step 2: LocalStorage se data lo (dusri baar)
      const storedData = localStorage.getItem('userData') || localStorage.getItem('user');
      if (storedData) {
        const userData = JSON.parse(storedData);
        console.log('📦 Loading from localStorage:', userData);
        
        // Fetch complete profile with semester
        await fetchCompleteProfile(userData.enrollmentNum);
        return;
      }
      
      // Step 3: Kuch nahi mila to login page bhejo
      console.log(' No data found, redirecting to login');
      navigate('/signin');
      
    } catch (error) {
      console.error(' Error:', error);
      setLoading(false);
    }
  };

  //  Complete profile fetch with semester details
  const fetchCompleteProfile = async (enrollmentNum) => {
    try {
      console.log(' Fetching complete profile for:', enrollmentNum);
      
      const token = localStorage.getItem('authToken');
      
      const response = await axios.get(
        `http://localhost:5000/api/student/profile/${enrollmentNum}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.success) {
        const dbData = response.data.data;
        console.log(' Database data:', dbData);
        
        
        // Format data for display
        const formattedData = formatStudentData(dbData);
        setStudentData(formattedData);
        
        // Update localStorage with complete data
        localStorage.setItem('userData', JSON.stringify(formattedData));
        localStorage.setItem('user', JSON.stringify(formattedData));
      } else {
        // Agar API fail ho to localStorage se jo hai use karo
        const storedData = localStorage.getItem('userData');
        if (storedData) {
          setStudentData(JSON.parse(storedData));
        }
      }
    } catch (error) {
      console.error(' Error fetching profile:', error);
      
      // Error me bhi localStorage se data dikhao
      const storedData = localStorage.getItem('userData');
      if (storedData) {
        setStudentData(JSON.parse(storedData));
      }
    } finally {
      setLoading(false);
    }
  };

  // Format student data
  const formatStudentData = (data) => {
    // Semester name extract karo
    let semesterDisplay = 'Not Assigned';
    
    if (data.semesterName) {
      semesterDisplay = data.semesterName;
    } else if (data.currentSemester) {
      semesterDisplay = data.currentSemester;
    } else if (data.semester) {
      semesterDisplay = data.semester;
    } else if (data.semesterFullInfo?.name) {
      semesterDisplay = data.semesterFullInfo.name;
    }
    
    return {
      _id: data._id,
      name: data.name || 'Student',
      email: data.email || '',
      enrollmentNum: data.enrollmentNum || data.enrollmentNumber || '',
      ber: data.ber || data.rollNumber || '',
      program: data.program || data.course || 'Not specified',
      batch: data.batch || 'N/A',
      
      //  Semester - yeh use karo
      semester: data.currentSemester || data.semesterName || 'Not specified',
      semesterName: data.semesterName,
      academicYear: data.academicYear || 'N/A',
      semesterIsActive: data.semesterIsActive,

      
      contactNumber: data.contactNumber || 'N/A',
      dob: data.dob ? new Date(data.dob).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }) : 'N/A',
      
      lastLogin: data.lastLogin ? new Date(data.lastLogin).toLocaleString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) : 'N/A',
      
      isActive: data.isActive !== undefined ? data.isActive : true,
      
      // Stats
      attendance: data.attendance || '92%',
      subjects: data.subjects || '6',
      notifications: data.notifications || '3',
      cgpa: data.cgpa || '8.5'
    };
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/signin');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Session expired. Please login again.</p>
          <button 
            onClick={() => navigate('/signin')}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header with Logout */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {studentData.name}! 🎓
          </h1>
          <p className="text-gray-600 mt-2">
            {studentData.program} • {studentData.semester} • Batch {studentData.batch}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-950 text-white p-8 rounded-xl shadow-lg mb-8">
        <div className="flex items-center space-x-6">
          <div className="bg-white text-blue-600 rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold">
            {studentData.name?.charAt(0)}
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold">{studentData.name}</h2>
            <p className="text-blue-100 mt-1">{studentData.email}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div>
                <p className="text-blue-200 text-sm">Enrollment</p>
                <p className="font-semibold">{studentData.enrollmentNum}</p>
              </div>
              <div>
                <p className="text-blue-200 text-sm">Roll Number</p>
                <p className="font-semibold">{studentData.ber}</p>
              </div>
              <div>
                <p className="text-blue-200 text-sm">Program</p>
                <p className="font-semibold">{studentData.program}</p>
              </div>
              <div>
                <p className="text-blue-200 text-sm">Batch</p>
                <p className="font-semibold">{studentData.batch}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Academic Info */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">📚 Academic Information</h3>
          <div className="space-y-3">
            <InfoItem label="Program" value={studentData.program} />
            <InfoItem label="Current Semester" value={studentData.currentSemester || studentData.semesterName || 'Not Assigned'} />            <InfoItem label="Batch" value={studentData.batch} />
            <InfoItem label="Enrollment Number" value={studentData.enrollmentNum} />
            <InfoItem label="Roll Number" value={studentData.ber} />
          </div>
        </div>

        {/* Personal Details */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">👤 Personal Details</h3>
          <div className="space-y-3">
            <InfoItem label="Full Name" value={studentData.name} />
            <InfoItem label="Email" value={studentData.email} />
            <InfoItem label="Contact" value={studentData.contactNumber} />
            <InfoItem label="Date of Birth" value={studentData.dob} />
            <InfoItem label="Last Login" value={studentData.lastLogin} />
          </div>
        </div>

       
      </div>
    </div>
  );
};

// Reusable InfoItem component
const InfoItem = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-500 text-sm">{label}:</span>
    <span className="font-medium text-gray-800 bg-gray-50 px-3 py-1 rounded-lg">
      {value || 'N/A'}
    </span>
  </div>
);

export default StudentHome;