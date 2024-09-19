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

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, month }) => {
  const chartData = {
    labels: data.map((d) => `${d._id} - ${d._id + 99}`),  // Displaying price range as "_id - (_id + 99)"
    datasets: [
      {
        label: 'Number of items',
        data: data.map((d) => d.count),
        backgroundColor: 'rgba(173, 216, 230, 1)',  // Dark grey color for bars
        borderColor: 'rgba(0, 0, 0, 1)',  // Black border for bars
        borderWidth: 2,  // Thicker border for contrast
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: '#333',  // Darker text for legend
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#333',  // Darker text for x-axis labels
        },
        grid: {
          display: false,  // Remove grid lines from the x-axis
        },
      },
      y: {
        ticks: {
          color: '#333',  // Darker text for y-axis labels
        },
        grid: {
          display: false,  // Remove grid lines from the y-axis
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800">Bar Chart Stats - {month}</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

BarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,  // Use _id as the price range start
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  month: PropTypes.string.isRequired,
};

export default BarChart;
