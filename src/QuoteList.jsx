// src/pages/QuoteList.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function QuoteList() {
  const [quotes, setQuotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const quotesPerPage = 20;

  useEffect(() => {
    const fetchQuotes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://assignment.stage.crafto.app/getQuotes?limit=${quotesPerPage}&offset=${
            (currentPage - 1) * quotesPerPage
          }`,
          {
            headers: { Authorization: token },
          }
        );
        setQuotes(response.data.data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuotes();
  }, [currentPage, navigate]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Quotes</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {quotes.map((quote) => (
            <div
              key={quote.id}
              style={{
                marginBottom: "20px",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={quote.mediaUrl}
                  alt="Quote"
                  style={{ width: "100%", height: "auto" }}
                />
                <p
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                  }}
                >
                  {quote.text}
                </p>
              </div>
              <p>By: {quote.username}</p>
              <p>Created at: {new Date(quote.createdat).toLocaleString()}</p>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{ margin: "0 5px" }}
            >
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={quotes.length < quotesPerPage}
              style={{ margin: "0 5px" }}
            >
              Next
            </button>
          </div>
        </>
      )}
      <Link
        to="/create-quote"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "10px",
          background: "#007bff",
          color: "white",
          textDecoration: "none",
          borderRadius: "50%",
        }}
      >
        +
      </Link>
    </div>
  );
}

export default QuoteList;
