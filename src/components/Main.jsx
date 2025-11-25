import TransactionContainer from './transactions/Container';
import CustomerContainer from './customers/Container';
import Loading from './layout/Loading';

import useFetch from '../hooks/useFetch';

function Main() {
  const { transactions, loading, error } = useFetch();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className='text'>ERROR - {error}</p>;
  }

  if (transactions.length === 0) {
    return <p className="text">Data Not Available.</p>;
  }

  return (
    <>
      <TransactionContainer />
      <CustomerContainer />
    </>
  )
}

export default Main;
