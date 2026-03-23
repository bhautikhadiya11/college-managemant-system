import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Users, CheckCircle, AlertCircle, Save, BarChart, BookOpen } from 'lucide-react';

const AttendancePage = () => {
  const [activeTab, setActiveTab] = useState('mark');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [students, setStudents] = useState([]);
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [loading, setLoading] = useState({ subjects: true, students: false });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Report states
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [reportData, setReportData] = useState(null);
  const [loadingReport, setLoadingReport] = useState(false);

  // Fetch subjects on mount
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get('http://localhost:5000/api/professor/attendance/subjects', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Subjects response:', res.data);
        if (res.data.success) {
          setSubjects(res.data.data);
        } else {
          setMessage({ type: 'error', text: 'Failed to load subjects' });
        }
      } catch (err) {
        console.error('Error fetching subjects:', err);
        setMessage({ type: 'error', text: err.response?.data?.message || 'Server error' });
      } finally {
        setLoading(prev => ({ ...prev, subjects: false }));
      }
    };
    fetchSubjects();
  }, []);

  // Fetch students when subject is selected
  useEffect(() => {
    if (!selectedSubject?._id) return;
    const fetchStudents = async () => {
      setLoading(prev => ({ ...prev, students: true }));
      try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get(`http://localhost:5000/api/professor/attendance/subjects/${selectedSubject._id}/students`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Students response:', res.data);
        if (res.data.success) {
          const studentsData = res.data.data;
          setStudents(studentsData);
          const initialStatus = {};
          studentsData.forEach(s => { initialStatus[s._id] = 'absent'; });
          setAttendanceStatus(initialStatus);
        } else {
          setMessage({ type: 'error', text: res.data.message });
        }
      } catch (err) {
        console.error('Error fetching students:', err);
        setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to load students' });
      } finally {
        setLoading(prev => ({ ...prev, students: false }));
      }
    };
    fetchStudents();
  }, [selectedSubject]);

  const handleStatusChange = (studentId, status) => {
    setAttendanceStatus(prev => ({ ...prev, [studentId]: status }));
  };

  const markAllPresent = () => {
    const allPresent = {};
    students.forEach(s => { allPresent[s._id] = 'present'; });
    setAttendanceStatus(allPresent);
  };

  const submitAttendance = async () => {
    if (!selectedSubject?._id || !attendanceDate) {
      setMessage({ type: 'error', text: 'Please select a subject and date' });
      return;
    }
    if (students.length === 0) {
      setMessage({ type: 'error', text: 'No students to mark attendance for this subject.' });
      return;
    }
    const payload = {
      subjectId: selectedSubject._id,
      date: attendanceDate,
      attendance: students.map(s => ({
        studentId: s._id,
        status: attendanceStatus[s._id] || 'absent',
      })),
    };
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.post('http://localhost:5000/api/professor/attendance/mark', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setMessage({ type: 'success', text: 'Attendance saved successfully!' });
      } else {
        setMessage({ type: 'error', text: res.data.message });
      }
    } catch (err) {
      console.error('Error saving attendance:', err);
      setMessage({ type: 'error', text: err.response?.data?.message || 'Server error' });
    } finally {
      setSaving(false);
    }
  };

  // Report semester fetching
  useEffect(() => {
    if (activeTab !== 'report') return;
    const fetchSemesters = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get('http://localhost:5000/api/professor/attendance/semesters', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) setSemesters(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSemesters();
  }, [activeTab]);

  // Report data fetching
  useEffect(() => {
    if (activeTab !== 'report' || !selectedSemester) return;
    const fetchReport = async () => {
      setLoadingReport(true);
      try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get('http://localhost:5000/api/professor/attendance/statistics', {
          params: { semesterId: selectedSemester, year: selectedYear, month: selectedMonth },
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) setReportData(res.data.data);
        else setReportData(null);
      } catch (err) {
        console.error('Error fetching report:', err);
        setReportData(null);
        setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to load report' });
      } finally {
        setLoadingReport(false);
      }
    };
    fetchReport();
  }, [activeTab, selectedSemester, selectedMonth, selectedYear]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('mark')}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium ${
                activeTab === 'mark'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <BookOpen size={18} /> Mark Attendance
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium ${
                activeTab === 'report'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <BarChart size={18} /> Attendance Report
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'mark' && (
              <>
                {/* Subject List */}
                {loading.subjects ? (
                  <div className="text-center py-8">Loading subjects...</div>
                ) : subjects.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No subjects assigned to you. Please contact administrator.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {subjects.map(sub => (
                      <div
                        key={sub._id}
                        onClick={() => setSelectedSubject(sub)}
                        className={`cursor-pointer p-4 rounded-lg shadow transition-all ${
                          selectedSubject?._id === sub._id
                            ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                            : 'bg-white border border-gray-200 hover:shadow-md'
                        }`}
                      >
                        <h3 className="text-lg font-semibold">{sub.name}</h3>
                        <p className={selectedSubject?._id === sub._id ? 'text-blue-100' : 'text-gray-500'}>
                          {sub.code} • {sub.semester?.semesterName || 'N/A'}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Attendance Table */}
                {selectedSubject && (
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-gray-700">
                        {selectedSubject.name} – Attendance
                        {loading.students && <span className="ml-2 text-sm text-gray-500">(loading...)</span>}
                      </h2>
                      <div className="flex gap-3">
                        <input
                          type="date"
                          value={attendanceDate}
                          onChange={(e) => setAttendanceDate(e.target.value)}
                          className="border rounded px-3 py-1"
                        />
                        <button
                          onClick={markAllPresent}
                          className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition"
                        >
                          <CheckCircle size={16} /> Mark All Present
                        </button>
                      </div>
                    </div>

                    {!loading.students && students.length === 0 && (
                      <div className="text-center py-8 text-gray-500">No students enrolled in this subject.</div>
                    )}

                    {students.length > 0 && (
                      <div className="overflow-x-auto border rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment No.</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {students.map(student => (
                              <tr key={student._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.enrollmentNum}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                  <div className="flex justify-center gap-3">
                                    <button
                                      onClick={() => handleStatusChange(student._id, 'present')}
                                      className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                                        attendanceStatus[student._id] === 'present'
                                          ? 'bg-green-600 text-white'
                                          : 'bg-gray-100 text-gray-700 hover:bg-green-100'
                                      }`}
                                    >
                                      Present
                                    </button>
                                    <button
                                      onClick={() => handleStatusChange(student._id, 'absent')}
                                      className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                                        attendanceStatus[student._id] === 'absent'
                                          ? 'bg-red-600 text-white'
                                          : 'bg-gray-100 text-gray-700 hover:bg-red-100'
                                      }`}
                                    >
                                      Absent
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={submitAttendance}
                        disabled={saving || loading.students || students.length === 0}
                        className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        <Save size={18} />
                        {saving ? 'Saving...' : 'Save Attendance'}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab === 'report' && (
              <>
                {/* Semester selector for report */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Semester</label>
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="w-full md:w-64 border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">-- Choose a semester --</option>
                    {semesters.map(sem => (
                      <option key={sem._id} value={sem._id}>
                        {sem.semesterName} ({sem.academicYear})
                      </option>
                    ))}
                  </select>
                </div>

                {selectedSemester && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                        <select
                          value={selectedMonth}
                          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        >
                          {months.map((month, idx) => (
                            <option key={idx} value={idx + 1}>{month}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                        <select
                          value={selectedYear}
                          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        >
                          {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {loadingReport ? (
                      <div className="text-center py-8">Loading report...</div>
                    ) : reportData ? (
                      <div>
                        <div className="bg-blue-50 p-4 rounded-lg mb-6">
                          <h3 className="text-lg font-semibold text-blue-800">Summary for {months[selectedMonth-1]} {selectedYear}</h3>
                          <p className="text-blue-600">Total Sessions Conducted: <span className="font-bold">{reportData.totalSessions}</span></p>
                        </div>

                        <div className="overflow-x-auto border rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment No.</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Attended</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {reportData.students.map(student => (
                                <tr key={student._id} className="hover:bg-gray-50">
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.enrollmentNum}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                                    {student.attended} / {reportData.totalSessions}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      student.percentage >= 75 ? 'bg-green-100 text-green-800' :
                                      student.percentage >= 50 ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-red-100 text-red-800'
                                    }`}>
                                      {student.percentage.toFixed(2)}%
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">No data for the selected period.</div>
                    )}
                  </>
                )}
              </>
            )}

            {/* Global message */}
            {message.text && (
              <div className={`mt-4 p-3 rounded-md flex items-center gap-2 ${
                message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                {message.text}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;