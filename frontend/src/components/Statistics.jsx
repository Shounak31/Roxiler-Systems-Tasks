import PropTypes from 'prop-types';

const Statistics = ({ statistics, month }) => {
  return (
    <div className="bg-gray-100 p-4 rounded mb-4">
      <h2 className="text-xl font-bold">Statistics - {month}</h2>
      <p>Total sale: {statistics.totalSalesAmount}</p>
      <p>Total sold items: {statistics.totalSoldItems}</p>
      <p>Total not sold items: {statistics.totalNotSoldItems}</p>
    </div>
  );
};

Statistics.propTypes = {
  statistics: PropTypes.shape({
    totalSalesAmount: PropTypes.number.isRequired,
    totalSoldItems: PropTypes.number.isRequired,
    totalNotSoldItems: PropTypes.number.isRequired,
  }).isRequired,
  month: PropTypes.string.isRequired,
};

export default Statistics;