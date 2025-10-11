import { useAuth } from '../../contexts/AuthContext';
import { DashboardLayout } from '../../layouts/DashboardLayout';

export function DashboardHome() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-2xl p-8">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
            {user!.name.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome back!</h1>
          <p className="text-gray-600 mt-2">{user!.name}</p>
          <p className="text-gray-500 text-sm">{user!.email}</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
