import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [reportData, setReportData] = useState(null);
  const [topPurchasers, setTopPurchasers] = useState(null);
  const [grossTotal, setGrossTotal] = useState(null);
  const [grossQuantity, setGrossQuantity] = useState(null);
  const [totalTopPrice, setTotalTopPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setTopPurchasers(null);
    try {
      const response = await axios.get("http://localhost:5000/fetch-and-store");
      setReportData(response.data);
    } catch (err) {
      setError("Error fetching data from the server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopPurchasers = async () => {
    setLoading(true);
    setError(null);
    setReportData(null);
    try {
      const response = await axios.get("http://localhost:5000/top-purchasers");
      setTopPurchasers(response.data.topPurchasers);
      setGrossTotal(response.data.grossTotal);
      setGrossQuantity(response.data.grossQuantity);
      setTotalTopPrice(response.data.totalPrice);
    } catch (err) {
      setError("the error while fetching top purchasers from the server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetData = () => {
    setReportData(null);
    setTopPurchasers(null);
    setGrossTotal(null);
    setGrossQuantity(null);
    setTotalTopPrice(null);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Store Data Report</h1>

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Please wait, Data is Loading...</p>
        </div>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="text-center mb-4">
        <button
          onClick={fetchData}
          className="custom-linear-gradient text-white px-4 py-2 rounded mr-2"
        >
          Generate Report
        </button>
        <button
          onClick={fetchTopPurchasers}
          className="custom-linear-gradient text-white px-4 py-2 rounded mr-2"
        >
          Top Purchasers
        </button>
        <button
          onClick={resetData}
          className="custom-radial-gradient text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      {reportData?.items && reportData?.items?.length > 0 && (
        <div className="overflow-x-auto mb-8">
          <h2 className="text-xl font-bold mb-4">Product Report</h2>
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
              {reportData?.items.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b text-left ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="py-2 px-4">{item?.productName}</td>
                  <td className="py-2 px-4">{item?.customerName}</td>
                  <td className="py-2 px-4">{item?.quantity}</td>
                  <td className="py-2 px-4">
                    <span className="font-semibold">$</span>{" "}
                    {item?.price?.toFixed(2)}
                  </td>
                  <td className="py-2 px-4">
                    <span className="font-semibold">$</span>{" "}
                    {item?.total?.toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="2" className="py-2 px-4 font-bold text-right">
                  Gross Total:
                </td>
                <td className="py-2 px-4">{reportData?.gross?.quantity}</td>
                <td className="py-2 px-4">
                  <span className="font-semibold">$</span>{" "}
                  {reportData?.gross?.price?.toFixed(2)}
                </td>
                <td className="py-2 px-4">
                  <span className="font-semibold">$</span>{" "}
                  {reportData?.gross?.total?.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {topPurchasers && topPurchasers?.length > 0 && (
        <div className="overflow-x-auto">
          <h2 className="text-xl font-bold mb-4">Top Purchasers Report</h2>
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-300 border-b border-gray-300">
              <tr>
                <th className="py-3 px-4 text-left text-gray-700">User Name</th>
                <th className="py-3 px-4 text-left text-gray-700">
                  Top Product
                </th>
                <th className="py-3 px-4 text-left text-gray-700">
                  Top Quantity
                </th>
                <th className="py-3 px-4 text-left text-gray-700">Top Price</th>
                <th className="py-3 px-4 text-left text-gray-700">
                  Total Amount Spent
                </th>
              </tr>
            </thead>
            <tbody>
              {topPurchasers?.map((user, index) => (
                <tr
                  key={index}
                  className={`border-b text-left ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="py-2 px-4">{user?.user_name}</td>
                  <td className="py-2 px-4">{user?.top_product}</td>
                  <td className="py-2 px-4">{user?.top_quantity}</td>
                  <td className="py-2 px-4">
                    <span className="font-semibold">$</span>{" "}
                    {user?.top_price?.toFixed(2)}
                  </td>
                  <td className="py-2 px-4">
                    <span className="font-semibold">$</span>{" "}
                    {user?.total_amount_spent?.toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="2" className="py-2 px-4 font-bold text-right">
                  Gross Total Spent:
                </td>
                <td className="py-2 px-4">{grossQuantity}</td>
                <td className="py-2 px-4">
                  <span className="font-semibold">$</span>{" "}
                  {grossTotal?.toFixed(2)}
                </td>
                <td className="py-2 px-4">
                  <span className="font-semibold">$</span>{" "}
                  {totalTopPrice?.toFixed(2)}
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
