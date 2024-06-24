import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, month }) => {
  const chartData = {
    labels: data.map((d) => d.range),
    datasets: [
      {
        label: 'Number of items',
        data: data.map((d) => d.count),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-gray-100 p-4 rounded">
      <h2 className="text-xl font-bold">Bar Chart Stats - {month}</h2>
      <Bar data={chartData} />
    </div>
  );
};

BarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      range: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  month: PropTypes.string.isRequired,
};

export default BarChart;
