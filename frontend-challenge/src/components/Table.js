import React from 'react';

export default function Table({ headers, items, renderRow }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="bg-blue-100 border-b border-gray-200 grid grid-cols-4 py-2 px-4">
        {headers.map((header, index) => (
          <div key={index}>{header}</div>
        ))}
      </div>
      {items.map((item, index) => (
        <div key={index} className="grid grid-cols-4 border-b py-2 px-4">
          {renderRow(item)}
        </div>
      ))}
    </div>
  );
}
