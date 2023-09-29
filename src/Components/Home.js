import React from 'react';
import Feed from './Feed';
import { useStoreState } from 'easy-peasy';

const Home = ({ isLoading, fetchError }) => {
  // Directly access searchResult from the store state
  const searchResult = useStoreState((state) => state.searchResult);

  return (
    <main className='container p-5'>
      {/* Conditional rendering for loading and error states */}
      {isLoading && <p>Loading search results...</p>}
      {fetchError && <p className='bg-danger'>{fetchError}</p>}

      {/* Render Feed or "No Result" message */}
      {!isLoading && !fetchError ? (
        <Feed posts={searchResult}/> 
      ) : (
        <center>
          <h1>No Result</h1>
        </center>
      )}
    </main>
  );
};

export default Home;
