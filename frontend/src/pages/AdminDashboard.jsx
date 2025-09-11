import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../utils/api';
import AdminBlogEditor from '../components/AdminBlogEditor'; // Fixed import
import { Edit, Trash2, Eye, Plus } from 'lucide-react';

// ... rest of the code remains the same

const AdminDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('blogs');
  const [blogs, setBlogs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showBlogEditor, setShowBlogEditor] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchData();
    }
  }, [user, activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'blogs') {
        const response = await api.get('/blogs/admin');
        setBlogs(response.data.blogs);
      } else if (activeTab === 'courses') {
        const response = await api.get('/courses');
        setCourses(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBlog = () => {
    setEditingBlog(null);
    setShowBlogEditor(true);
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setShowBlogEditor(true);
  };

  const handleSaveBlog = async (formData) => {
    try {
      if (editingBlog) {
        await api.put(`/blogs/${editingBlog._id}`, formData);
      } else {
        await api.post('/blogs', formData);
      }
      setShowBlogEditor(false);
      setEditingBlog(null);
      fetchData();
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await api.delete(`/blogs/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You need to be an admin to access this page.</p>
        </div>
      </div>
    );
  }

  if (showBlogEditor) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminBlogEditor
          onSave={handleSaveBlog}
          initialData={editingBlog}
          onCancel={() => {
            setShowBlogEditor(false);
            setEditingBlog(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('dashboard')}</h1>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('blogs')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'blogs'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('blogManagement')}
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'courses'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('courseManagement')}
          </button>
        </nav>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('loading')}</p>
        </div>
      ) : activeTab === 'blogs' ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">{t('blogManagement')}</h2>
            <button
              onClick={handleCreateBlog}
              className="bg-primary-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-primary-700"
            >
              <Plus size={20} className="mr-2" />
              {t('createNew')}
            </button>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {blogs.map((blog) => (
                <li key={blog._id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          {blog.image ? (
                            <img className="h-10 w-10 rounded-full" src={`http://localhost:5000/${blog.image}`} alt="" />
                          ) : (
                            <span className="text-gray-400">📝</span>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <h3 className="text-sm font-medium text-gray-900">
                              {blog.title}
                            </h3>
                            <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              blog.isPublished 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {blog.isPublished ? t('published') : t('draft')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            {new Date(blog.createdAt).toLocaleDateString()} • {blog.views} {t('views')}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => window.open(`/blog/${blog._id}`, '_blank')}
                          className="text-gray-400 hover:text-gray-500"
                          title={t('view')}
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          onClick={() => handleEditBlog(blog)}
                          className="text-blue-400 hover:text-blue-500"
                          title={t('edit')}
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog._id)}
                          className="text-red-400 hover:text-red-500"
                          title={t('delete')}
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            {blogs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">{t('noBlogs')}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('courseManagement')}</h2>
          {/* Course management UI would go here */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600">Course management features coming soon...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;