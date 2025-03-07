"use client";

import { useState, useEffect } from "react";
import LoadingPage from "../loading";
import AddQuote from "./AddBook";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const fetchQuotes = async () => {
    const res = await fetch("/api/books");
    const quotes = await res.json();
    setQuotes(quotes);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/books/search?query=${query}`);
    const quotes = await res.json();
    setQuotes(quotes);
    setLoading(false);
  };

  const deleteQuote = async (id) => {
    console.log(`Deleting quote with id: ${id}`);
    const res = await fetch(`/api/books/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      fetchQuotes();
    } else {
      console.error(`Failed to delete quote with id: ${id}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search Quotes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      <AddQuote refreshQuotes={fetchQuotes} />
      {quotes.map((quote) => (
        <div key={quote._id}>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{quote.text}</h2>
              <p className="text-gray-500">- {quote.author}</p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => deleteQuote(quote._id)}
                  className="btn btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Quotes;
