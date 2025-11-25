import React, { useState } from 'react';
import PropTypes, { func } from "prop-types";
import { DEFAULT_MONTH } from '../../constants';

function FilterPanel({ onFilterChange, months = []}) {
  const [selectedMonth, setSelectedMonth] = useState(DEFAULT_MONTH);
  const [search, setSearch] = useState('');

  function apply() {
    onFilterChange({ selectedMonth: selectedMonth, searchQuery: search.trim().toLowerCase() });
  }

  function handleChange (e) {
    setSearch(e.target.value)
  }

  function handleSelect (e) {
    setSelectedMonth(e.target.value)
  }

  return (
    <div className="filter-panel">
      <input
        placeholder="Search customer name..."
        value={search}
        onChange={handleChange}
      />
      <select value={selectedMonth} onChange={handleSelect}>
        <option value="ALL">All months</option>
        {months?.map(month => <option key={month} value={month}>{month}</option>)}
      </select>
      <button onClick={apply}>Apply</button>
    </div>
  );
};

FilterPanel.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  months: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default FilterPanel;
