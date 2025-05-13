import { SetStateAction, useState } from 'react';

const CalendarDropdown = () => {
  const [selectedRange, setSelectedRange] = useState('This Month');
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (value: SetStateAction<string>) => {
    setSelectedRange(value);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Display selected value */}
      <button 
        onClick={toggleDropdown} 
        style={{
          padding: '6px 10px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '12px',
          outline: 'none',
          backgroundColor: 'white',
          color: '#333',
          width: '150px',
        }}
      >
        {selectedRange}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <ul 
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            margin: 0,
            padding: '8px 0',
            listStyle: 'none',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            width: '150px',
            zIndex: 1000,
            border: '1px solid #ccc',
          }}
        >
          <li 
            onClick={() => handleSelect('Today')} 
            style={{ padding: '8px 12px', cursor: 'pointer', fontSize: '12px', color: '#333' }}
          >
            Today
          </li>
          <li 
            onClick={() => handleSelect('Last 7 Days')} 
            style={{ padding: '8px 12px', cursor: 'pointer', fontSize: '12px', color: '#333' }}
          >
            Last 7 Days
          </li>
          <li 
            onClick={() => handleSelect('This Month')} 
            style={{ padding: '8px 12px', cursor: 'pointer', fontSize: '12px', color: '#333' }}
          >
            This Month
          </li>
          <li 
            onClick={() => handleSelect('This Year')} 
            style={{ padding: '8px 12px', cursor: 'pointer', fontSize: '12px', color: '#333' }}
          >
            This Year
          </li>
          <li 
            onClick={() => handleSelect('Custom')} 
            style={{ padding: '8px 12px', cursor: 'pointer', fontSize: '12px', color: '#333' }}
          >
            Custom
          </li>
        </ul>
      )}
    </div>
  );
};

export default CalendarDropdown ;
