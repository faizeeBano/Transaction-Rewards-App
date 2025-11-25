export const initialUIState = {
  selectedCustomerId: null,
  filter: { selectedMonth: 'ALL', searchQuery: '' }
};

export function uiReducer(state, action) {
  switch (action.type) {
    case 'SELECT_CUSTOMER':
      return { ...state, selectedCustomerId: action.payload };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}
