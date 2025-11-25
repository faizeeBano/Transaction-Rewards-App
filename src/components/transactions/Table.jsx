import PropTypes from "prop-types";
import TransactionRow from "./Row";
import { HEADERS } from "../../constants";

function TransactionTable({ transactions = [] }) {
  
  return (
    <table className="tx-table">
      <thead>
        <tr className="table-header">
          <th>{HEADERS?.TRANSACTION_ID}</th>
          <th>{HEADERS?.DATE}</th>
          <th>{HEADERS?.CUSTOMER_NAME}</th>
          <th>{HEADERS?.AMOUNT}</th>
          <th>{HEADERS?.POINTS}</th>
        </tr>
      </thead>

      <tbody>
        {transactions?.map((transaction) => (
          <TransactionRow transaction={transaction} key={transaction?.transactionId} />
        ))}
      </tbody>
    </table>
  )
}

TransactionTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      transactionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      customerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      customerName: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      points: PropTypes.number.isRequired,
    })
  ),
};

export default TransactionTable;
