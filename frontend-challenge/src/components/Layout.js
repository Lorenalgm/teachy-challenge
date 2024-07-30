import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </div>
  );
}
