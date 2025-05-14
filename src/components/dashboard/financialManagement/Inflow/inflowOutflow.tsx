import {
    LineChart,
    Line,
    // XAxis,
    Tooltip,
    ResponsiveContainer,
  } from 'recharts';
import DateFilterMenu from '../../../General/filterMenu';
import { Group, } from "@mantine/core";

  
  const data = [
    { month: 'Jan', import: 4000, expense: 3000, profit: 1000 },
    { month: 'Feb', import: 4100, expense: 3050, profit: 1050 },
    { month: 'Mar', import: 4200, expense: 3100, profit: 1100 },
    { month: 'Apr', import: 4300, expense: 3200, profit: 1100 },
    { month: 'May', import: 4400, expense: 3250, profit: 1150 },
    { month: 'Jun', import: 4500, expense: 3300, profit: 1200 },
    { month: 'Jul', import: 4550, expense: 3350, profit: 1200 },
    { month: 'Aug', import: 4600, expense: 3400, profit: 1200 },
    { month: 'Sep', import: 4700, expense: 3450, profit: 1250 },
    { month: 'Oct', import: 4800, expense: 3500, profit: 1300 },
    { month: 'Nov', import: 4900, expense: 3550, profit: 1350 },
    { month: 'Dec', import: 5000, expense: 3600, profit: 1400 },
  ];
  
  export default function InflowOutflowChart() {
  
    return (
      <div style={{ background: '#fff', padding: '1rem', borderRadius: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Inflow vs Outflow</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', fontSize: '12px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ backgroundColor: '#E62E05', width: 8, height: 8, borderRadius: '50%' }} />
                <span>Import</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ backgroundColor: '#FF9C66', width: 8, height: 8, borderRadius: '50%' }} />
                <span>Expense</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ backgroundColor: '#97180C', width: 8, height: 8, borderRadius: '50%' }} />
                <span>Profit</span>
              </div>
            </div>
            
            {/* <CustomDropdown /> */}
            <Group className="mt-2 sm:mt-0">
          <DateFilterMenu
            defaultFilter="This Month"
            buttonVariant="subtle"
            buttonSize="md"
            showIconOnly="sm"
          />
        </Group>
          </div>
        </div>
  
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            {/* <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#888', fontSize: 12 }}
            /> */}
            <Tooltip />
            <Line type="monotone" dataKey="import" stroke="#E62E05" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="expense" stroke="#FF9C66" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="profit" stroke="#97180C" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  