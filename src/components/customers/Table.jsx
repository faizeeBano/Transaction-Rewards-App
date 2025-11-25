import PropTypes from "prop-types";
import CustomerRow from "./Row";
import { HEADERS } from '../../constants'

function CustomerTable({ customers = [], onSelectCustomer }) {
  return (
    <table className="tx-table">
      <thead>
        <tr className="table-header">
          <th>{HEADERS?.CUSTOMER_ID}</th>
          <th>{HEADERS?.CUSTOMER_NAME}</th>
          <th>{HEADERS?.TOTAL_POINTS}</th>
          <th>{HEADERS?.ACTION}</th>
        </tr>
      </thead>

      <tbody>
        {customers.map((customer) => (
          <CustomerRow
            customer={customer}
            key={customer?.customerId}
            onView={(customer) => onSelectCustomer(customer.customerId)}
          />
        ))}
      </tbody>
    </table>
  );
}

CustomerTable.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      customerName: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
      monthly: PropTypes.objectOf(PropTypes.number),
    })
  ),
};

export default CustomerTable;
