import PropTypes from "prop-types";

function CustomerRow({ customer = {}, onView, handleSelectCustomer }) {
  return (
    <tr>
      <td>{customer?.customerId}</td>
      <td>{customer?.customerName}</td>
      <td>{customer?.total}</td>
      <td>
        <button className="view-btn" onClick={() => onView(customer)}>View</button>
      </td>
    </tr>
  );
}

CustomerRow.propTypes = {
  customer: PropTypes.shape({
    customerId: PropTypes.string.isRequired,
    customerName: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  onView: PropTypes.func.isRequired
};

export default CustomerRow;