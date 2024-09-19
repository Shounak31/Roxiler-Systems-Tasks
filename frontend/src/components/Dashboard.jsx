import { useState, useEffect } from 'react';
import axios from 'axios';
import BarChart from './BarChart';
import Statistics from './Statistics';
import TransactionsTable from './TransactionTable';
import PieChart from './PieChart';

const Dashboard = () => {
  const [month, setMonth] = useState('march');
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const transactionsRes = await axios.get(`http://localhost:6060/api/transactions?month=${month}`);
        setTransactions(transactionsRes.data);

        const statisticsRes = await axios.get(`http://localhost:6060/api/statistics/${month}`);
        setStatistics(statisticsRes.data);

        const barChartRes = await axios.get(`http://localhost:6060/api/sales/price-range/${month}`);
        setBarChartData(barChartRes.data);

        const pieChartRes = await axios.get(`http://localhost:6060/api/sales/category-items/${month}`);
        setPieChartData(pieChartRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [month]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      {/* Left Side Menu */}
      <div className="w-1/5 p-4 bg-gray-100">
        <h2 className="text-xl font-bold mb-4">Dashboard Menu</h2>
        {/* Month Selector */}
        <select value={month} onChange={(e) => setMonth(e.target.value)} className="p-2 border rounded w-full mb-4">
          <option value="january">January</option>
          <option value="february">February</option>
          <option value="march">March</option>
          <option value="april">April</option>
          <option value="may">May</option>
          <option value="june">June</option>
          <option value="july">July</option>
          <option value="august">August</option>
          <option value="september">September</option>
          <option value="october">October</option>
          <option value="november">November</option>
          <option value="december">December</option>
        </select>

        {/* Statistics Info */}
        <Statistics statistics={statistics} month={month} />
      </div>

      {/* Main Dashboard Content */}
      <div className="w-4/5 p-4">
        <h1 className="text-2xl font-bold mb-4">Transaction Dashboard</h1>
        {/* Transactions Table */}
        <TransactionsTable transactions={transactions} />

        {/* Bottom Section with Bar and Pie Charts */}
        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="chart-container bg-gray-100 p-4 rounded-lg border-black shadow-lg hover:shadow-xl">
            <BarChart data={barChartData} month={month} />
          </div>
          <div className="chart-container bg-gray-100 p-4 mx-2 rounded-lg border-black shadow-lg hover:shadow-xl">
            <PieChart data={pieChartData} month={month} /> {/* Pass data and month to PieChart */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
