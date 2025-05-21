import {
  BarChart, Bar, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { assetCategoryData } from '../../../../utils/mockData';

export const AssetCategoryBreakdown = () => (
  <div className="bg-white rounded-xl shadow p-4">
    <h2 className="text-lg font-semibold mb-4">Asset Category Breakdown</h2>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        layout="vertical"
        data={assetCategoryData}
        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {/* <XAxis type="number" tick={{ fontSize: 12 }} />
        <YAxis dataKey="category" type="category" tick={{ fontSize: 12 }} /> */}
        <Tooltip />
        <Bar dataKey="value" fill="#1E40AF" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);
