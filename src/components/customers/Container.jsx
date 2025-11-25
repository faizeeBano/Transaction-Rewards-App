import React, { useMemo, useReducer, useCallback } from 'react';

import { aggregateRewards } from '../../utils/rewards';
import { uiReducer, initialUIState } from '../../utils/filter';
import useFetch from '../../hooks/useFetch';

import CustomerTable from './Table';
import FilterPanel from '../common/filterPannel';
import Modal from "../common/Modal";

function CustomerContainer() {
  const [state, dispatch] = useReducer(uiReducer, initialUIState);
  const { transactions } = useFetch();

  const aggregatedData = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return { customers: {} };
    }
    return aggregateRewards(transactions || []);
  }, [transactions]);

  const customersArray = useMemo(() => {
    const customers = aggregatedData?.customers;
    if (!customers) return [];

    return Object.values(customers).sort((customer1, customer2) => customer2.total - customer1.total);
  }, [aggregatedData]);

  const handleFilterChange = useCallback(filter => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  }, []);

  const handleSelectCustomer = useCallback((customerId) => {
    dispatch({ type: 'SELECT_CUSTOMER', payload: customerId });
  }, []);

  const months = useMemo(() => {
    return Array.from(
      new Set(
        (transactions || []).map(transaction =>
          new Date(transaction?.date || '')?.toISOString()?.slice(0, 7)
        )
      )
    ).sort();
  }, [transactions]);

  // filtered customers (apply search & month filter)
  const visibleCustomers = useMemo(() => {
    const { selectedMonth, searchQuery } = state.filter;
    return customersArray.filter(customer => {
      if (searchQuery) {
        if (!customer?.customerName || !customer?.customerName.toLowerCase().includes(searchQuery)) return false;
      }
      if (selectedMonth && selectedMonth !== "ALL") {
        return customer?.monthly[selectedMonth] > 0;
      }
      return true;
    });
  }, [customersArray, state.filter]);

  const selectedCustomer = useMemo(() => {
    const id = state.selectedCustomerId;
    return id ? aggregatedData.customers?.[id] : null;
  }, [aggregatedData.customers, state.selectedCustomerId]);

  return (
    <div className='customer-container'>
      <h2 className="title">All Customers List</h2>
      <FilterPanel onFilterChange={handleFilterChange} months={months} />
      {visibleCustomers.length === 0
        ?
        <div className='text'>No customers match the filter.</div>
        :
        <CustomerTable
          customers={visibleCustomers}
          onSelectCustomer={handleSelectCustomer}
        />
      }
      {selectedCustomer && (
        <Modal
          customer={selectedCustomer}
          close={() => dispatch({ type: "SELECT_CUSTOMER", payload: null })}
        />
      )}
    </div>
  )
}

export default CustomerContainer;
