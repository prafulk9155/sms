// import React from 'react';
// 
const AddNewURL = () => {
  return (
    <div className="max-w-md mx-auto my-10">
      <h1 className="text-xl mb-4">Add New URL</h1>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">URL</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Add URL</button>
      </form>
    </div>
  );
};

export default AddNewURL;
