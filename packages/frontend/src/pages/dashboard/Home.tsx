import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import type { HelloResponse, ErrorResponse } from 'shared';

export function DashboardHome() {
  const { user, logout } = useAuth();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProtectedData = async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('/api/hello', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data: HelloResponse = await res.json();
        setMessage(data.message);
      } else {
        const errorData: ErrorResponse = await res.json();
        setError(errorData.message || 'Failed to fetch data');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
          {user?.name.charAt(0).toUpperCase()}
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Welcome back!</h1>
        <p className="text-gray-600 mt-2">{user?.name}</p>
        <p className="text-gray-500 text-sm">{user?.email}</p>
      </div>

      {message && (
        <div className="bg-blue-100 rounded-lg p-4 mb-4">
          <p className="text-blue-800">{message}</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 rounded-lg p-4 mb-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <button
        onClick={fetchProtectedData}
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-green-700 transition duration-200 disabled:opacity-50 mb-3"
      >
        {loading ? 'Loading...' : 'Fetch Protected Data'}
      </button>

      <button
        onClick={logout}
        className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition duration-200"
      >
        Logout
      </button>
    </div>
  );
}
