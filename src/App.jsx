import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchingData = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(
          "https://raw.githubusercontent.com/Bit-Code-Technologies/mockapi/main/purchase.json"
        );
        const fetchedData = response.data;
        setData(fetchedData);
      } catch (err) {
        setError("Error while fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchingData();
  }, []);
  return (
    <div className="App p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Store Data Report</h1>
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg font-medium text-blue-600 animate-pulse">
            Please wait, Data is Loading...
          </p>
        </div>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {data?.length > 0 && (
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
              {data?.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 px-4">{item?.product_name}</td>
                  <td className="py-3 px-4">{item?.name}</td>
                  <td className="py-3 px-4">{item?.purchase_quantity}</td>
                  <td className="py-3 px-4">${item?.product_price}</td>
                  <td className="py-3 px-4">
                    $
                    {(
                      item?.purchase_quantity * parseFloat(item?.product_price)
                    ).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
