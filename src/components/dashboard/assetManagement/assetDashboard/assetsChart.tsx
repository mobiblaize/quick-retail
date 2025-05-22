import {
  BarChart, Bar, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { assetsMonthlyData } from '../../../../utils/mockData';

export const AssetsChart = () => (
  <div className="bg-white rounded-xl shadow p-4 mb-6">
    <h2 className="text-lg font-semibold mb-4">Assets Chart</h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={assetsMonthlyData}>
        <CartesianGrid strokeDasharray="3 3" />
        {/* <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} />
        <YAxis tick={{ fontSize: 12 }} tickLine={false} /> */}
        <Tooltip />
        <Legend />
        <Bar dataKey="inUse" name="Assets in Use" fill="#1E40AF" />
        <Bar dataKey="notInUse" name="Assets not in Use" fill="#9CA3AF" />
        <Bar dataKey="retired" name="Retired Assets" fill="#FACC15" />
        <Bar dataKey="disposed" name="Disposed Assets" fill="#DC2626" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);
