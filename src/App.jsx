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
        // setData(fetchedData);
        const processedReport = fetchedData?.map((item) => ({
          productName: item?.product_name,
          customerName: item?.name,
          quantity: item?.purchase_quantity,
          price: parseFloat(item?.product_price),
          total: item?.purchase_quantity * parseFloat(item?.product_price),
        }));

        const grossQuantity = processedReport.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        const grossTotal = processedReport.reduce(
          (acc, item) => acc + item.total,
          0
        );

        setData({
          items: processedReport,
          gross: { quantity: grossQuantity, total: grossTotal },
        });
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
      {data?.items && data?.items?.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-300 border-b border-gray-300">
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
              {data.items.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b text-left ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="py-2 px-4">{item?.productName}</td>
                  <td className="py-2 px-4">{item?.customerName}</td>
                  <td className="py-2 px-4">{item?.quantity}</td>
                  <td className="py-2 px-4">${item?.price.toFixed(2)}</td>
                  <td className="py-2 px-4">${item?.total.toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="2" className="py-2 px-4 font-bold text-right">
                  Gross Total:
                </td>
                <td className="py-2 px-4 font-bold">{data?.gross?.quantity}</td>
                <td className="py-2 px-4"></td>
                <td className="py-2 px-4 font-bold">
                  ${data?.gross?.total.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
