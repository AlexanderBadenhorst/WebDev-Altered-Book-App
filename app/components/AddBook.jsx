"use client";

import { useState } from "react";

const AddQuote = ({ refreshQuotes }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newQuoteText, setNewQuoteText] = useState("");
  const [newQuoteAuthor, setNewQuoteAuthor] = useState("");

  const handleSubmitNewQuote = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/books/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        text: newQuoteText,
        author: newQuoteAuthor,
      }),
    });
    if (res.ok) {
      setNewQuoteText("");
      setNewQuoteAuthor("");
      setModalOpen(false);
      refreshQuotes();
    }
  };

  return (
    <div>
      <button className="btn" onClick={() => setModalOpen(true)}>
        Add Quote
      </button>
      <dialog
        id="my_modal_3"
        className={`modal ${modalOpen ? "modal-open" : ""}`}
      >
        <form
          method="dialog"
          className="modal-box"
          onSubmit={handleSubmitNewQuote}
        >
          <button
            onClick={() => setModalOpen(false)}
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Add New Quote</h3>
          <input
            type="text"
            value={newQuoteText}
            onChange={(e) => setNewQuoteText(e.target.value)}
            placeholder="Enter New Quote"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            value={newQuoteAuthor}
            onChange={(e) => setNewQuoteAuthor(e.target.value)}
            placeholder="Enter Author"
            className="input input-bordered w-full max-w-xs"
          />
          <button type="submit" className="btn btn-primary">
            Add Quote
          </button>
        </form>
      </dialog>
    </div>
  );
};
export default AddQuote;
