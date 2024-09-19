import PropTypes from 'prop-types';

const TransactionsTable = ({ transactions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="py-2 px-4 border-r">ID</th>
            <th className="py-2 px-4 border-r">Title</th>
            <th className="py-2 px-4 border-r">Description</th>
            <th className="py-2 px-4 border-r">Price</th>
            <th className="py-2 px-4 border-r">Category</th>
            <th className="py-2 px-4 border-r">Sold</th>
            <th className="py-2 px-4">Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b border-gray-200">
              <td className="py-2 px-4 border-r">{transaction.id}</td>
              <td className="py-2 px-4 border-r">{transaction.title}</td>
              <td className="py-2 px-4 border-r">{transaction.description}</td>
              <td className="py-2 px-4 border-r">{transaction.price}</td>
              <td className="py-2 px-4 border-r">{transaction.category}</td>
              <td className="py-2 px-4 border-r">{transaction.sold ? 'Yes' : 'No'}</td>
              <td className="py-2 px-4 border-r">
                <img src={transaction.image} alt={transaction.title} className="w-16 h-16 object-cover" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TransactionsTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      sold: PropTypes.bool.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TransactionsTable;
