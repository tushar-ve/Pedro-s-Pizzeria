import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SearchComponent = () => {
  const [searchResults, setSearchResults] = useState([]);
 const {name}= useParams();
  // Fetch the search results from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/account/get-names/?name=${name}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [name]);

  return (
    <div>
      {/* Display the search results */}
      {searchResults.map((result) => (
        <div key={result.id}>{result.name}</div>
      ))}
    </div>
  );
};

export default SearchComponent;

