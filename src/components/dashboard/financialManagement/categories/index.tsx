import ExpensePieChart from "./expenseCategory";
import IncomePieChart from "./incomeCategory";


const Categories = () => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ flex: '1 1 300px', maxWidth: '100%' }}>
        <IncomePieChart />
      </div>
      <div style={{ flex: '1 1 300px', maxWidth: '100%' }}>
        <ExpensePieChart />
      </div>
    </div>
  );
};

export default Categories;
