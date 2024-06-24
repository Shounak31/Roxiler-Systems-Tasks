import { useState, useEffect } from 'react';
import axios from 'axios';
import BarChart from './BarChart';
import Statistics from './Statistics';
import TransactionsTable from './TransactionsTable';

const Dashboard = () => {
  const [month, setMonth] = useState('march');
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionsRes = await axios.get(`http://localhost:6000/api/transactions?month=${month}`);
        console.log('Transactions:', transactionsRes.data); 
        setTransactions(transactionsRes.data);

        const statisticsRes = await axios.get(`http://localhost:6000/api/statistics/${month}`);
        console.log('Statistics:', statisticsRes.data); 
        setStatistics(statisticsRes.data);

        const barChartRes = await axios.get(`http://localhost:6000/api/sales/price-range/${month}`);
        console.log('BarChart Data:', barChartRes.data);  
        setBarChartData(barChartRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [month]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Transaction Dashboard</h1>
        <select value={month} onChange={(e) => setMonth(e.target.value)} className="p-2 border rounded">
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
      </div>
      <TransactionsTable transactions={transactions} />
      <Statistics statistics={statistics} month={month} />
      <BarChart data={barChartData} month={month} />
    </div>
  );
};

export default Dashboard;
