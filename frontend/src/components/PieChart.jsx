import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import PropTypes from 'prop-types'; // Import PropTypes

// Register components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, month }) => {
    if (!data) {
        return <div>Loading...</div>;
    }

    // Process data for the chart
    const categories = data.map(item => item.category);
    const counts = data.map(item => item.count);

    const chartData = {
        labels: categories, // Categories as labels
        datasets: [
            {
                label: `Items Sold in ${month}`,
                data: counts, // Counts as data
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0'
                ]
            }
        ]
    };

    return (
        <div style={{ width: '50%', margin: '0 auto' }}>
            <h2>Sales by Category ({month})</h2>
            <Pie data={chartData} />
        </div>
    );
};

// Add PropTypes validation
PieChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            category: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
        })
    ).isRequired,
    month: PropTypes.string.isRequired,
};

export default PieChart;
