// SearchResults.js
import React from 'react';
import './styles/tailwind.css';

function SearchResults({ results }) {
  return (
    <ul className="space-y-4">
      {results.map((restaurant, index) => (
        <li key={index} className="bg-white p-4 shadow">
          <h2 className="text-lg font-semibold mb-2">{restaurant.name}</h2>
          <p className="mb-2">
            Status: <span className="font-semibold">{restaurant.status}</span>
          </p>
          <p className="text-sm">{restaurant.description}</p>
        </li>
      ))}
    </ul>
  );
}

export default SearchResults;
