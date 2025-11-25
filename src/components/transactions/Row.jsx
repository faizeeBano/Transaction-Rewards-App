import PropTypes from "prop-types";
import { calculatePointsForAmount } from "../../utils/rewards";

function TransactionRow({ transaction }) {
  const numericAmount = Number(transaction.amount);
  const isValidAmount = !isNaN(numericAmount);

  const formattedDate = new Date(transaction.date).toLocaleDateString();

  return (
    <tr>
      <td>{transaction.transactionId}</td>
      <td>{formattedDate}</td>
      <td>{transaction.customerName}</td>
      <td>{isValidAmount ? numericAmount.toFixed(2) : "Invalid Amount"}</td>
      <td>{isValidAmount ? calculatePointsForAmount(numericAmount) : "Invalid"}</td>
    </tr>
  );
}

TransactionRow.propTypes = {
  transaction: PropTypes.shape({
    transactionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    date: PropTypes.string.isRequired,
    customerName: PropTypes.string.isRequired,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export default TransactionRow;
