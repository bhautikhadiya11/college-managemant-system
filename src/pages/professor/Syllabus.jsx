import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit2, Trash2, Plus, X, FileText, Loader2, CheckCircle } from 'lucide-react';

const ProfessorSyllabus = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState({});
  const [uploading, setUploading] = useState({});
  const [deleting, setDeleting] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', 'add'
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [formData, setFormData] = useState({ content: '', attachments: [] });
  const [tempFiles, setTempFiles] = useState([]); // for new attachments during edit/add

  const fileInputRef = useRef(null);

  // 🔁 Use sessionStorage instead of localStorage
  const token = sessionStorage.getItem('authToken');
  const userRole = sessionStorage.getItem('userRole');
  const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');

  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    if (!token) {
      setError('No authentication token. Please log in.');
      setLoading(false);
      return;
    }
    if (userRole !== 'professor') {
      setError(`Access denied: Only professors can manage syllabus.`);
      setLoading(false);
      setTimeout(() => navigate('/professor/dashboard'), 3000);
      return;
    }
    if (!userData.email) {
      setError('User email missing. Please log in again.');
      setLoading(false);
      return;
    }
    fetchSubjects();
  }, [token, userRole, userData.email]);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/professor/profile/${userData.email}`);
      if (!data.success) throw new Error(data.message);
      const professor = data.data;

      if (!professor.coursesTaught || professor.coursesTaught.length === 0) {
        setSubjects([]);
        setLoading(false);
        return;
      }

      const subjectsWithSyllabus = await Promise.all(
        professor.coursesTaught.map(async (subject) => {
          try {
            const syllabusRes = await api.get(`/syllabus/subject/${subject._id}`);
            if (syllabusRes.data.success) {
              return { ...subject, syllabus: syllabusRes.data.data };
            }
          } catch (err) {
            // no syllabus
          }
          return { ...subject, syllabus: null };
        })
      );
      setSubjects(subjectsWithSyllabus);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to load subjects');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files) => {
    const uploadPromises = Array.from(files).map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data.url;
    });
    try {
      const urls = await Promise.all(uploadPromises);
      return urls;
    } catch (err) {
      console.error(err);
      alert('Some files failed to upload');
      return [];
    }
  };

  const openModal = (subject, mode) => {
    setSelectedSubject(subject);
    setModalMode(mode);
    if (mode === 'add') {
      setFormData({ content: '', attachments: [] });
      setTempFiles([]);
    } else if (mode === 'edit') {
      setFormData({
        content: subject.syllabus?.content || '',
        attachments: subject.syllabus?.attachments || [],
      });
      setTempFiles([]);
    } else {
      // view mode
      setFormData({
        content: subject.syllabus?.content || '',
        attachments: subject.syllabus?.attachments || [],
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSubject(null);
    setFormData({ content: '', attachments: [] });
    setTempFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (!selectedSubject) return;

    setSaving(prev => ({ ...prev, [selectedSubject._id]: true }));
    let allAttachments = [...formData.attachments];
    if (tempFiles.length > 0) {
      const newUrls = await handleFileUpload(tempFiles);
      allAttachments = [...allAttachments, ...newUrls];
      setTempFiles([]);
    }

    const payload = {
      content: formData.content,
      attachments: allAttachments,
    };

    try {
      const { data } = await api.post(`/syllabus/subject/${selectedSubject._id}`, payload);
      if (data.success) {
        // Update the subject's syllabus in the local state
        setSubjects(prev =>
          prev.map(subj =>
            subj._id === selectedSubject._id
              ? { ...subj, syllabus: data.data }
              : subj
          )
        );
        setSuccessMessage(`Syllabus for ${selectedSubject.name} saved!`);
        setTimeout(() => setSuccessMessage(''), 3000);
        closeModal();
      } else {
        alert(data.message || 'Save failed');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error saving syllabus');
    } finally {
      setSaving(prev => ({ ...prev, [selectedSubject._id]: false }));
    }
  };

  const handleDelete = async (subject) => {
    if (!window.confirm(`Delete syllabus for ${subject.name}? This cannot be undone.`)) return;
    setDeleting(prev => ({ ...prev, [subject._id]: true }));
    try {
      const { data } = await api.delete(`/syllabus/subject/${subject._id}`);
      if (data.success) {
        setSubjects(prev =>
          prev.map(subj =>
            subj._id === subject._id ? { ...subj, syllabus: null } : subj
          )
        );
        setSuccessMessage(`Syllabus for ${subject.name} deleted.`);
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        alert(data.message || 'Delete failed');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error deleting syllabus');
    } finally {
      setDeleting(prev => ({ ...prev, [subject._id]: false }));
    }
  };

  const handleTempFiles = (files) => {
    setTempFiles(Array.from(files));
  };

  const removeAttachment = (urlToRemove) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter(url => url !== urlToRemove),
    }));
  };

  const removeTempFile = (index) => {
    setTempFiles(prev => prev.filter((_, i) => i !== index));
  };

  if (loading) return <div className="p-6">Loading subjects...</div>;
  if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;
  if (subjects.length === 0) return <div className="p-6">No subjects assigned to you. Please contact admin.</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Syllabus Management</h1>

      {/* Global success toast */}
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-fade-in">
          <CheckCircle size={20} />
          <span>{successMessage}</span>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {subjects.map(subject => (
          <div key={subject._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold">
              {subject.name} ({subject.code})
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Semester: {subject.semester?.semesterName || 'N/A'}
            </p>

            {subject.syllabus ? (
              <>
                {/* Syllabus summary */}
                <div className="mb-3">
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {subject.syllabus.content.substring(0, 100)}...
                  </p>
                  {subject.syllabus.attachments.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      {subject.syllabus.attachments.length} attachment(s)
                    </p>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(subject, 'view')}
                    className="flex-1 bg-blue-100 text-blue-700 py-2 rounded hover:bg-blue-200 transition flex items-center justify-center gap-1"
                  >
                    <Eye size={16} /> View
                  </button>
                  <button
                    onClick={() => openModal(subject, 'edit')}
                    className="flex-1 bg-yellow-100 text-yellow-700 py-2 rounded hover:bg-yellow-200 transition flex items-center justify-center gap-1"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(subject)}
                    disabled={deleting[subject._id]}
                    className="flex-1 bg-red-100 text-red-700 py-2 rounded hover:bg-red-200 transition flex items-center justify-center gap-1"
                  >
                    {deleting[subject._id] ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    {deleting[subject._id] ? '' : 'Delete'}
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => openModal(subject, 'add')}
                className="w-full bg-green-100 text-green-700 py-2 rounded hover:bg-green-200 transition flex items-center justify-center gap-1"
              >
                <Plus size={16} /> Add Syllabus
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Modal for View/Edit/Add */}
      {modalOpen && selectedSubject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {modalMode === 'view' ? 'View Syllabus' : modalMode === 'edit' ? 'Edit Syllabus' : 'Add Syllabus'}
                <span className="text-sm text-gray-500 ml-2">({selectedSubject.name})</span>
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {modalMode === 'view' ? (
                // View mode: display content and attachments
                <div>
                  <h3 className="font-medium mb-2">Content</h3>
                  <div className="bg-gray-50 p-4 rounded whitespace-pre-wrap mb-4">
                    {formData.content || 'No content provided.'}
                  </div>
                  {formData.attachments.length > 0 && (
                    <>
                      <h3 className="font-medium mb-2">Attachments</h3>
                      <div className="space-y-2">
                        {formData.attachments.map((url, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <FileText size={16} className="text-blue-600" />
                            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                              {url.split('/').pop()}
                            </a>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                // Edit/Add mode: form with content and attachments
                <form onSubmit={handleAddOrUpdate}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Syllabus Content</label>
                    <textarea
                      rows="8"
                      className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={formData.content}
                      onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Enter syllabus details (week-wise topics, etc.)"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Attachments</label>

                    {/* Existing attachments (in edit mode) */}
                    {formData.attachments.length > 0 && (
                      <div className="mb-2 space-y-1">
                        {formData.attachments.map((url, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                            <div className="flex items-center gap-2">
                              <FileText size={14} />
                              <span className="text-sm truncate">{url.split('/').pop()}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeAttachment(url)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* New files to upload */}
                    {tempFiles.length > 0 && (
                      <div className="mb-2 space-y-1">
                        {tempFiles.map((file, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-blue-50 p-2 rounded">
                            <div className="flex items-center gap-2">
                              <FileText size={14} />
                              <span className="text-sm">{file.name}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeTempFile(idx)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <input
                      type="file"
                      multiple
                      ref={fileInputRef}
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.ppt,.pptx"
                      onChange={e => {
                        if (e.target.files.length) handleTempFiles(e.target.files);
                        e.target.value = ''; // allow same file to be selected again
                      }}
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">Supported: PDF, Images, Word, PowerPoint (max 10MB each)</p>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving[selectedSubject._id]}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                    >
                      {saving[selectedSubject._id] && <Loader2 size={16} className="animate-spin" />}
                      {saving[selectedSubject._id] ? 'Saving...' : (modalMode === 'edit' ? 'Update' : 'Create')}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessorSyllabus;