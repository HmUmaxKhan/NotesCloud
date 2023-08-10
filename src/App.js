import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {

  // Create a new QueryClient instance
const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <NoteState>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
    </QueryClientProvider>
  );
}

export default App;
