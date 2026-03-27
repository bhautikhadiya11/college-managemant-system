// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FileText, Eye, BookOpen, ChevronRight, ChevronLeft } from 'lucide-react';

// const StudentSyllabus = () => {
//   const [semesters, setSemesters] = useState([]);
//   const [selectedSemester, setSelectedSemester] = useState(null);
//   const [subjects, setSubjects] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedSyllabus, setSelectedSyllabus] = useState(null);

//   // Get student data from sessionStorage (same as professor)
//   const token = sessionStorage.getItem('authToken');
//   const userRole = sessionStorage.getItem('userRole');
//   const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');

//   const api = axios.create({
//     baseURL: 'http://localhost:5000/api',
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   // Fetch semesters on mount
//   useEffect(() => {
//     if (!token || userRole !== 'student') {
//       setError('Access denied. Please log in as a student.');
//       return;
//     }
//     fetchSemesters();
//   }, []);

//   const fetchSemesters = async () => {
//     try {
//       setLoading(true);
//       const { data } = await api.get('/syllabus/student/semesters');
//       if (data.success) {
//         setSemesters(data.data);
//         if (data.data.length > 0) {
//           setSelectedSemester(data.data[0]); // select first by default
//           fetchSubjectsForSemester(data.data[0]._id);
//         }
//       } else {
//         setError('Failed to load semesters');
//       }
//     } catch (err) {
//       console.error(err);
//       setError('Error loading semesters');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchSubjectsForSemester = async (semesterId) => {
//     try {
//       setLoading(true);
//       const { data } = await api.get(`/syllabus/student/semester/${semesterId}`);
//       if (data.success) {
//         setSubjects(data.data);
//       } else {
//         setSubjects([]);
//       }
//     } catch (err) {
//       console.error(err);
//       setError('Failed to load subjects');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSemesterChange = (semester) => {
//     setSelectedSemester(semester);
//     fetchSubjectsForSemester(semester._id);
//   };

//   const openSyllabusModal = (syllabus) => {
//     setSelectedSyllabus(syllabus);
//     setModalOpen(true);
//   };

//   if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;
//   if (!token) return <div className="p-6">Please log in to view syllabus.</div>;

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">📚 My Syllabus</h1>

//       {/* Semester Tabs */}
//       {semesters.length > 0 && (
//         <div className="mb-8">
//           <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
//             {semesters.map((sem) => (
//               <button
//                 key={sem._id}
//                 onClick={() => handleSemesterChange(sem)}
//                 className={`px-4 py-2 rounded-t-lg font-medium transition ${
//                   selectedSemester?._id === sem._id
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 {sem.semesterName}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {loading ? (
//         <div className="text-center py-10">Loading subjects...</div>
//       ) : subjects.length === 0 ? (
//         <div className="text-center py-10 text-gray-500">No subjects found for this semester.</div>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {subjects.map((item) => (
//             <div key={item.subject.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
//               <div className="flex items-start justify-between">
//                 <div>
//                   <h2 className="text-xl font-semibold">{item.subject.name}</h2>
//                   <p className="text-sm text-gray-500">{item.subject.code}</p>
//                   <p className="text-xs text-gray-400 mt-1">Semester: {item.subject.semester?.semesterName}</p>
//                 </div>
//                 {item.syllabus && (
//                   <button
//                     onClick={() => openSyllabusModal(item.syllabus)}
//                     className="text-blue-600 hover:text-blue-800"
//                   >
//                     <Eye size={20} />
//                   </button>
//                 )}
//               </div>

//               {item.syllabus ? (
//                 <div className="mt-3">
//                   <p className="text-sm text-gray-700 line-clamp-3">
//                     {item.syllabus.content.substring(0, 150)}...
//                   </p>
//                   {item.syllabus.attachments?.length > 0 && (
//                     <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
//                       <FileText size={12} /> {item.syllabus.attachments.length} attachment(s)
//                     </p>
//                   )}
//                 </div>
//               ) : (
//                 <p className="text-sm text-gray-400 italic mt-3">No syllabus uploaded yet.</p>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Syllabus Modal */}
//       {modalOpen && selectedSyllabus && (
//         <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
//             <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
//               <h2 className="text-xl font-semibold">Syllabus Details</h2>
//               <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-700">
//                 ✕
//               </button>
//             </div>
//             <div className="p-6">
//               <h3 className="font-medium mb-2">Content</h3>
//               <div className="bg-gray-50 p-4 rounded whitespace-pre-wrap mb-4">
//                 {selectedSyllabus.content || 'No content provided.'}
//               </div>
//               {selectedSyllabus.attachments?.length > 0 && (
//                 <>
//                   <h3 className="font-medium mb-2">Attachments</h3>
//                   <div className="space-y-2">
//                     {selectedSyllabus.attachments.map((url, idx) => (
//                       <div key={idx} className="flex items-center gap-2">
//                         <FileText size={16} className="text-blue-600" />
//                         <a
//                           href={url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 underline"
//                         >
//                           {url.split('/').pop()}
//                         </a>
//                       </div>
//                     ))}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentSyllabus;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, Eye } from 'lucide-react';

const StudentSyllabus = () => {
  const [studentSemester, setStudentSemester] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);
  const [selectedSubjectName, setSelectedSubjectName] = useState('');

  const token = sessionStorage.getItem('authToken');
  const userRole = sessionStorage.getItem('userRole');
  const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');

  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    if (!token || userRole !== 'student') {
      setError('Access denied. Please log in as a student.');
      return;
    }
    // Get student's semester from userData (the login response includes semesterID)
    const semesterId = userData.semesterID;
    if (!semesterId) {
      setError('Student semester information not found. Please contact admin.');
      return;
    }
    setStudentSemester(semesterId);
    fetchSubjects(semesterId);
  }, []);

  const fetchSubjects = async (semesterId) => {
    try {
      setLoading(true);
      const { data } = await api.get(`/syllabus/student/semester/${semesterId}`);
      if (data.success) {
        setSubjects(data.data);
      } else {
        setSubjects([]);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load subjects');
    } finally {
      setLoading(false);
    }
  };

  const openSyllabusModal = (subject) => {
    if (!subject.syllabus) return; // No syllabus to show
    setSelectedSyllabus(subject.syllabus);
    setSelectedSubjectName(subject.subject.name);
    setModalOpen(true);
  };

  if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;
  if (!token) return <div className="p-6">Please log in to view syllabus.</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📚 My Syllabus</h1>

      {loading ? (
        <div className="text-center py-10">Loading your syllabus...</div>
      ) : subjects.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No subjects found for your semester.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((item) => {
            const hasSyllabus = !!item.syllabus;
            return (
              <div
                key={item.subject.id}
                onClick={() => hasSyllabus && openSyllabusModal(item)}
                className={`border rounded-lg p-4 transition-all ${
                  hasSyllabus
                    ? 'cursor-pointer hover:shadow-lg hover:border-blue-300 hover:bg-blue-50/50'
                    : 'cursor-default opacity-75'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{item.subject.name}</h2>
                    <p className="text-sm text-gray-500">{item.subject.code}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Semester: {item.subject.semester?.semesterName}
                    </p>
                  </div>
                  {hasSyllabus && (
                    <Eye size={20} className="text-blue-600" />
                  )}
                </div>

                {hasSyllabus ? (
                  <div className="mt-3">
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {item.syllabus.content.substring(0, 150)}...
                    </p>
                    {item.syllabus.attachments?.length > 0 && (
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <FileText size={12} /> {item.syllabus.attachments.length} attachment(s)
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic mt-3">No syllabus uploaded yet.</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Syllabus Modal */}
      {modalOpen && selectedSyllabus && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {selectedSubjectName} - Syllabus
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <h3 className="font-medium mb-2">Content</h3>
              <div className="bg-gray-50 p-4 rounded whitespace-pre-wrap mb-4">
                {selectedSyllabus.content || 'No content provided.'}
              </div>
              {selectedSyllabus.attachments?.length > 0 && (
                <>
                  <h3 className="font-medium mb-2">Attachments</h3>
                  <div className="space-y-2">
                    {selectedSyllabus.attachments.map((url, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <FileText size={16} className="text-blue-600" />
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          {url.split('/').pop()}
                        </a>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentSyllabus;