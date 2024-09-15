function App() {
  return (
    <div className="App p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Store Data Report</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="py-3 px-4 text-left text-gray-700">
                Product Name
              </th>
              <th className="py-3 px-4 text-left text-gray-700">
                Customer Name
              </th>
              <th className="py-3 px-4 text-left text-gray-700">Quantity</th>
              <th className="py-3 px-4 text-left text-gray-700">Price</th>
              <th className="py-3 px-4 text-left text-gray-700">Total</th>
            </tr>
          </thead>
          <tbody>
            <h1>Data Show</h1>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
