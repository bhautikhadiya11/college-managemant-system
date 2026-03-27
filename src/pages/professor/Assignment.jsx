import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText, Calendar, Trash2, Download, X, Paperclip, Clock, Edit } from 'lucide-react';

const ProfessorAssignments = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    attachments: [],
  });
  const [loading, setLoading] = useState({ subjects: true, assignments: false });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [deleteId, setDeleteId] = useState(null);

  // Edit state
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    existingAttachments: [],
    newAttachments: [],
  });
  const [showEditModal, setShowEditModal] = useState(false);

  // Timeout ref for messages
  const messageTimeoutRef = useRef(null);

  // Helper to show timed messages
  const showMessage = (type, text) => {
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    setMessage({ type, text });
    messageTimeoutRef.current = setTimeout(() => {
      setMessage({ type: '', text: '' });
      messageTimeoutRef.current = null;
    }, 5000); // 5 seconds
  };

  // Fetch subjects on mount
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        const res = await axios.get('http://localhost:5000/api/assignments/subjects', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setSubjects(res.data.data);
        } else {
          showMessage('error', 'Failed to load subjects');
        }
      } catch (err) {
        console.error(err);
        showMessage('error', err.response?.data?.message || 'Server error');
      } finally {
        setLoading(prev => ({ ...prev, subjects: false }));
      }
    };
    fetchSubjects();
  }, []);

  // Fetch assignments for the selected subject
  useEffect(() => {
    if (!selectedSubject) return;
    const fetchAssignments = async () => {
      setLoading(prev => ({ ...prev, assignments: true }));
      try {
        const token = sessionStorage.getItem('authToken');
        const res = await axios.get(`http://localhost:5000/api/assignments/professor?subjectId=${selectedSubject}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setAssignments(res.data.data);
        } else {
          showMessage('error', 'Failed to load assignments');
        }
      } catch (err) {
        console.error(err);
        showMessage('error', err.response?.data?.message || 'Server error');
      } finally {
        setLoading(prev => ({ ...prev, assignments: false }));
      }
    };
    fetchAssignments();
  }, [selectedSubject]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (formData.attachments.length + files.length > 5) {
      showMessage('error', 'Maximum 5 attachments allowed');
      return;
    }
    setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...files] }));
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSubject) {
      showMessage('error', 'Please select a subject first');
      return;
    }
    if (!formData.title || !formData.description || !formData.dueDate) {
      showMessage('error', 'Please fill all required fields');
      return;
    }
    setSubmitting(true);
    try {
      const token = sessionStorage.getItem('authToken');
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('subjectId', selectedSubject);
      data.append('dueDate', formData.dueDate);
      formData.attachments.forEach(file => {
        data.append('attachments', file);
      });
      const res = await axios.post('http://localhost:5000/api/assignments', data, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success) {
        showMessage('success', 'Assignment created successfully!');
        setFormData({ title: '', description: '', dueDate: '', attachments: [] });
        setShowModal(false);
        // Refresh assignments
        const refreshRes = await axios.get(`http://localhost:5000/api/assignments/professor?subjectId=${selectedSubject}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (refreshRes.data.success) setAssignments(refreshRes.data.data);
      } else {
        showMessage('error', res.data.message);
      }
    } catch (err) {
      console.error(err);
      showMessage('error', err.response?.data?.message || 'Server error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this assignment? This action cannot be undone.')) return;
    try {
      const token = sessionStorage.getItem('authToken');
      await axios.delete(`http://localhost:5000/api/assignments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssignments(prev => prev.filter(a => a._id !== id));
      showMessage('success', 'Assignment deleted successfully');
    } catch (err) {
      console.error(err);
      showMessage('error', err.response?.data?.message || 'Failed to delete');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Edit functions
  const openEditModal = (assignment) => {
    // Clear any existing message before opening modal
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    setMessage({ type: '', text: '' });
    setEditingAssignment(assignment);
    setEditFormData({
      title: assignment.title,
      description: assignment.description,
      dueDate: assignment.dueDate.split('T')[0],
      existingAttachments: assignment.attachments || [],
      newAttachments: [],
    });
    setShowEditModal(true);
  };

  const handleEditFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (editFormData.existingAttachments.length + editFormData.newAttachments.length + files.length > 5) {
      showMessage('error', 'Maximum 5 attachments allowed');
      return;
    }
    setEditFormData(prev => ({
      ...prev,
      newAttachments: [...prev.newAttachments, ...files],
    }));
  };

  const removeExistingAttachment = (index) => {
    setEditFormData(prev => ({
      ...prev,
      existingAttachments: prev.existingAttachments.filter((_, i) => i !== index),
    }));
  };

  const removeNewAttachment = (index) => {
    setEditFormData(prev => ({
      ...prev,
      newAttachments: prev.newAttachments.filter((_, i) => i !== index),
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editFormData.title || !editFormData.description || !editFormData.dueDate) {
      showMessage('error', 'Please fill all required fields');
      return;
    }
    setSubmitting(true);
    try {
      const token = sessionStorage.getItem('authToken');
      const data = new FormData();
      data.append('title', editFormData.title);
      data.append('description', editFormData.description);
      data.append('dueDate', editFormData.dueDate);
      // Send IDs of attachments to keep
      const keepIds = editFormData.existingAttachments.map(att => att._id);
      data.append('attachmentsToKeep', JSON.stringify(keepIds));
      // Append new files
      editFormData.newAttachments.forEach(file => {
        data.append('newAttachments', file);
      });

      const res = await axios.put(`http://localhost:5000/api/assignments/${editingAssignment._id}`, data, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success) {
        showMessage('success', 'Assignment updated successfully!');
        setShowEditModal(false);
        // Refresh assignments list
        const refreshRes = await axios.get(`http://localhost:5000/api/assignments/professor?subjectId=${selectedSubject}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (refreshRes.data.success) setAssignments(refreshRes.data.data);
      } else {
        showMessage('error', res.data.message);
      }
    } catch (err) {
      console.error(err);
      showMessage('error', err.response?.data?.message || 'Server error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-900 bg-clip-text text-transparent">
            Assignment Manager
          </h1>
          <p className="text-gray-500 mt-2">Create and manage assignments for your students</p>
        </div>

        {/* Subject Cards */}
        {loading.subjects ? (
          <div className="text-center py-8">Loading subjects...</div>
        ) : subjects.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p className="text-yellow-700">No subjects assigned to you. Please contact administrator.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {subjects.map(sub => (
              <div
                key={sub._id}
                onClick={() => setSelectedSubject(sub._id)}
                className={`cursor-pointer rounded-xl p-5 transition-all duration-200 transform hover:scale-105 ${
                  selectedSubject === sub._id
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-900 text-white shadow-lg ring-2 ring-indigo-300'
                    : 'bg-white shadow-md hover:shadow-xl border border-gray-100'
                }`}
              >
                <h3 className="text-xl font-semibold">{sub.name}</h3>
                <p className={selectedSubject === sub._id ? 'text-indigo-100' : 'text-gray-500'}>
                  {sub.code}
                </p>
                {sub.semester && (
                  <p className={`text-sm mt-1 ${selectedSubject === sub._id ? 'text-indigo-200' : 'text-gray-400'}`}>
                    {sub.semester.semesterName}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {selectedSubject && (
          <>
            {/* Action Bar */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Assignments for {subjects.find(s => s._id === selectedSubject)?.name}
              </h2>
              <button
                onClick={() => {
                  // Clear any existing message before opening modal
                  if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
                  setMessage({ type: '', text: '' });
                  setShowModal(true);
                }}
                className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition transform hover:scale-105"
              >
                <Plus size={18} /> New Assignment
              </button>
            </div>

            {/* Assignments List */}
            {loading.assignments ? (
              <div className="text-center py-8">Loading assignments...</div>
            ) : assignments.length === 0 ? (
              <div className="bg-gray-50 rounded-xl p-12 text-center">
                <FileText size={48} className="mx-auto text-gray-400 mb-3" />
                <p className="text-gray-500">No assignments yet. Click "New Assignment" to create one.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {assignments.map(assign => (
                  <div key={assign._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-200 border border-gray-100">
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-800">{assign.title}</h3>
                          <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                            <span className="flex items-center gap-1"><Clock size={14} /> Due: {formatDate(assign.dueDate)}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(assign)}
                            className="text-indigo-500 hover:text-indigo-700 transition"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(assign._id)}
                            className="text-red-500 hover:text-red-700 transition"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-3 line-clamp-3">{assign.description}</p>
                      {assign.attachments?.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1"><Paperclip size={14} /> Attachments</p>
                          <div className="flex flex-wrap gap-2">
                            {assign.attachments.map((att, idx) => (
                              <a
                                key={idx}
                                href={att.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-blue-600 hover:underline bg-blue-50 px-3 py-1 rounded-full text-sm"
                              >
                                <Download size={12} />
                                {att.originalName}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="mt-4 text-xs text-gray-400">
                        Created: {formatDate(assign.createdAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal for creating assignment */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b p-5 flex justify-between items-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-900 bg-clip-text text-transparent">
                Create New Assignment
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date *</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Attachments (max 5 files)</label>
                <input
                  type="file"
                  multiple
                  accept="image/*,application/pdf,.doc,.docx,.txt"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
                {formData.attachments.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Selected files:</p>
                    <ul className="space-y-1 mt-1">
                      {formData.attachments.map((file, idx) => (
                        <li key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                          <span className="text-sm truncate">{file.name}</span>
                          <button type="button" onClick={() => removeFile(idx)} className="text-red-500 hover:text-red-700">
                            <X size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {message.text && (
                <div className={`p-3 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {message.text}
                </div>
              )}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition"
                >
                  {submitting ? 'Creating...' : 'Create Assignment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingAssignment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b p-5 flex justify-between items-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-900 bg-clip-text text-transparent">
                Edit Assignment
              </h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleUpdate} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  rows="4"
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date *</label>
                <input
                  type="date"
                  value={editFormData.dueDate}
                  onChange={(e) => setEditFormData({ ...editFormData, dueDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              {/* Existing Attachments */}
              {editFormData.existingAttachments.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Attachments</label>
                  <ul className="space-y-1">
                    {editFormData.existingAttachments.map((att, idx) => (
                      <li key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                        <span className="text-sm truncate">{att.originalName}</span>
                        <button type="button" onClick={() => removeExistingAttachment(idx)} className="text-red-500 hover:text-red-700">
                          <X size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* New Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Add New Attachments</label>
                <input
                  type="file"
                  multiple
                  accept="image/*,application/pdf,.doc,.docx,.txt"
                  onChange={handleEditFileChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
                {editFormData.newAttachments.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">New files to upload:</p>
                    <ul className="space-y-1 mt-1">
                      {editFormData.newAttachments.map((file, idx) => (
                        <li key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                          <span className="text-sm truncate">{file.name}</span>
                          <button type="button" onClick={() => removeNewAttachment(idx)} className="text-red-500 hover:text-red-700">
                            <X size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {message.text && (
                <div className={`p-3 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {message.text}
                </div>
              )}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition"
                >
                  {submitting ? 'Updating...' : 'Update Assignment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessorAssignments;