import { useState } from 'react';
import avatar1 from "../../../../assets/images/Avatar1.png"

const messages = [
  {
    id: 1,
    name: 'Olivia Rhye',
    time: '03:34 PM',
    subject: 'Standardisation of Written',
    date: 'Monday, April 16, 2023',
    body: `Dear Moshhod, Please find attached this invoice.....`,
    noteImage: '/note-preview.png', // replace with actual image path
    totalAmount: '₦60,000.00',
  },
  {
    id: 2,
    name: 'Kristin Watson',
    time: '03:34 PM',
    subject: 'Standardisation of Written',
    date: 'Monday, April 16, 2023',
    body: `Message content for Kristin...`,
    noteImage: '',
    totalAmount: '₦0.00',
  },
  {
    id: 3,
    name: 'Kristin Watson',
    time: '03:34 PM',
    subject: 'Standardisation of Written',
    date: 'Monday, April 16, 2023',
    body: `Message content for Kristin...`,
    noteImage: '',
    totalAmount: '₦0.00',
  },
  {
    id: 4,
    name: 'Kristin Watson',
    time: '03:34 PM',
    subject: 'Standardisation of Written',
    date: 'Monday, April 16, 2023',
    body: `Message content for Kristin...`,
    noteImage: '',
    totalAmount: '₦0.00',
  },
  {
    id: 5,
    name: 'Kristin Watson',
    time: '03:34 PM',
    subject: 'Standardisation of Written',
    date: 'Monday, April 16, 2023',
    body: `Message content for Kristin...`,
    noteImage: '',
    totalAmount: '₦0.00',
  },
  {
    id: 6,
    name: 'Kristin Watson',
    time: '03:34 PM',
    subject: 'Standardisation of Written',
    date: 'Monday, April 16, 2023',
    body: `Message content for Kristin...`,
    noteImage: '',
    totalAmount: '₦0.00',
  },
  {
    id: 7,
    name: 'Kristin Watson',
    time: '03:34 PM',
    subject: 'Standardisation of Written',
    date: 'Monday, April 16, 2023',
    body: `Message content for Kristin...`,
    noteImage: '',
    totalAmount: '₦0.00',
  },
];

export default function InboxView() {
  const [selectedMessage, setSelectedMessage] = useState(messages[0]);
  const items = [
    {
      name: 'Product Name',
      description: 'Product description here and just enough to show how long the text is',
      quantity: 32,
      price: 10000000,
      discount: '3%',
      vat: '7.5%',
      total: 10000000,
    },
    {
      name: 'Product Name',
      description: 'Product description here and just enough to show how long the text is',
      quantity: 32,
      price: 10000000,
      discount: '3%',
      vat: '7.5%',
      total: 10000000,
    },
    {
      name: 'Product Name',
      description: 'Product description here and just enough to show how long the text is',
      quantity: 32,
      price: 10000000,
      discount: '3%',
      vat: '7.5%',
      total: 10000000,
    },
  ];


  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <div className="w-[360px] border-r bg-white p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Messages</h2>
        <input
          type="text"
          placeholder="Search"
          className="w-full mb-6 px-3 py-2 border rounded-md"
        />

<div className="space-y-0">
  {messages.map((msg) => (
    <div
      key={msg.id}
      onClick={() => setSelectedMessage(msg)}
      className={`flex flex-col border-b cursor-pointer ${
        selectedMessage?.id === msg.id ? 'bg-orange-100' : 'hover:bg-gray-100'
      }`}
    >
      <div className="p-3 flex items-start gap-2">
        <input
          type="checkbox"
          className="mt-1"
          onClick={(e) => e.stopPropagation()} // Prevent checkbox click from selecting message
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <p className="font-medium">{msg.name}</p>
            <p className="text-sm text-gray-500">{msg.time}</p>
          </div>
          <p className="text-sm text-[#97180C]">{msg.subject}</p>
          <p className="text-sm text-gray-700 line-clamp-2">{msg.body}</p>
        </div>
      </div>
    </div>
  ))}
</div>

      </div>

      {/* Main Panel */}
      <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <div className="flex flex-col items-start justify-between">
          <div className='flex flex-col'>
            <h2 className="text-lg font-semibold ">Send Debit Note to Vendor</h2>
            <div className='flex gap-6'>
          <img src={avatar1} alt="logo" className="object-contain" />
            <div className=''>
            <p className="text-sm text-gray-500 mt-1">{selectedMessage.name}</p>
            <p className="text-sm text-gray-500">{selectedMessage.date}</p>
            </div>

            </div>
          </div>
          <div className="text-[12px] mt-4  bg-[#FFF9F5] p-3 justify-end flex items-right text-right">
            <button className="px-3 py-1 text-green-600 font-medium hover:underline">✔ Complaint Resolved</button>
            <button className="px-3 py-1 text-red-600 font-medium hover:underline">✖ Decline</button>
            <button className="px-3 py-1 text-orange-600 font-medium hover:underline">➕ Make a Request</button>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Description</h3>
          <div className="whitespace-pre-line text-gray-700 text-[12px]">{selectedMessage.body}</div>
        </div>

        {/* Note Image/Table */}
        <div className="mt-6 border rounded-md p-4 bg-white">
        
           <div className="flex justify-between items-start text-[10px] ">
          <div>
            <p className="text-orange-500 font-semibold">QUICK RETAIL</p>
            <p className="text-gray-400 mt-1">Receipt #189301</p>
          </div>
          <div className="text-right text-gray-500">
            <p>Company Address, Street name, State,</p>
            <p>Country</p>
            <p>+234 (Phone Number)</p>
            <p>+234 (Phone Number)</p>
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-gray-700">
          <div>
            <p className="font-bold">Customer Details</p>
            <p>Onuhwechi Onochieokwu</p>
            <p>Street 34, Doveland, Lagos</p>
            <p>Lagos</p>
          </div>
          <div className="text-right">
            <p className="font-bold">Receipt Details</p>
            <p>Date: June 9, 2023</p>
            <p>Receipt Date: June 9, 2023</p>
          </div>
        </div>
        <div className=''>
          <table className="w-full text-left  text-[8px] ">
            <thead className="bg-gray-50  text-gray-600">
              <tr>
                <th className="p-2 ">Item Name & Description</th>
                <th className="p-2 ">Quantity</th>
                <th className="p-2 ">Price/Unit</th>
                <th className="p-2 ">Discount</th>
                <th className="p-2 ">Tax</th>
                <th className="p-2 ">Total Value</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className=" ">
                  <td className="p-2 ">
                    <p className="font-semibold whitespace-nowrap">{item.name}</p>
                    <p className="text-gray-500 ">{item.description}</p>
                  </td>
                  <td className="p-2 ">{item.quantity}</td>
                  <td className="p-2 ">₦{item.price.toLocaleString()}</td>
                  <td className="p-2 ">{item.discount}</td>
                  <td className="p-2 ">VAT {item.vat}</td>
                  <td className="p-2">₦{item.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>

        {/* Amount Footer */}
        <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-md text-center">
          <p className="text-sm font-medium text-gray-600">GRAND VALUE</p>
          <p className="text-2xl font-bold text-orange-600">{selectedMessage.totalAmount}</p>
        </div>
      </div>
    </div>
  );
}
