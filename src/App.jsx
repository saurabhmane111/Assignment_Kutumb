import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import QuoteCreation from "./QuoteCreation";
import QuoteList from "./QuoteList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/quotes"
          element={
            <PrivateRoute>
              <QuoteList />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-quote"
          element={
            <PrivateRoute>
              <QuoteCreation />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
