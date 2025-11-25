import PropTypes from "prop-types";
import { useMemo } from "react";

export default function Modal({ customer = {}, close }) {
  const monthlyEntries = useMemo(() => {
    if (!customer?.monthly) return [];

    return Object.entries(customer.monthly).sort(
      ([customer1], [customer2]) => customer1.localeCompare(customer2) // sort by YYYY-MM
    );
  }, [customer]);

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        
        <h2>Customer Details</h2>

        <p><strong>Name:</strong> {customer?.customerName}</p>
        <p><strong>Total Points:</strong> {customer?.total}</p>

        <h3 className="modal-text">Monthly Breakdown</h3>

        <div className="month-list">
          {monthlyEntries.map(([month, points]) => {
            const readable = new Date(`${month}-01`).toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            });

            return (
              <p key={month}>
                <strong>{readable}: </strong> {points} points
              </p>
            );
          })}
        </div>

        <button className="close-btn" onClick={close}>Close</button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  customer: PropTypes.shape({
    customerId: PropTypes.string.isRequired,
    customerName: PropTypes.string.isRequired,
    monthly: PropTypes.objectOf(PropTypes.number).isRequired,
    total: PropTypes.number.isRequired,
  }),
  close: PropTypes.func.isRequired,
};
