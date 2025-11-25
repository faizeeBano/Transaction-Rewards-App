import React, { useState, useMemo } from "react";
import TransactionTable from "./Table";
import Pagination from '../common/Pagination';
import useFetch from "../../hooks/useFetch";
import { DEFAULT_PAGE_SIZE, DEFAULT_CURRENT_PAGE } from "../../constants";

function TransactionContainer() {
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
  const { transactions = [] } = useFetch();

  const totalPages = useMemo(() => {
    return Math.ceil(transactions.length / DEFAULT_PAGE_SIZE);
  }, [transactions]);

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * DEFAULT_PAGE_SIZE;
    return transactions.slice(start, start + DEFAULT_PAGE_SIZE);
  }, [transactions, currentPage]);

  return (
    <div className="transaction-container">
      <h2 className="title">All Transactions List</h2>
      <TransactionTable transactions={currentData} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

export default TransactionContainer;
