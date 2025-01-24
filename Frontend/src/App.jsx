import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ANAGRAM from "./components/tags/ANAGRAM";
import CONTENT_ONLY from "./components/tags/CONTENT_ONLY";
import CONVERSATION from "./components/tags/CONVERSATION";
import MCQ from "./components/tags/MCQ";
import READ_ALONG from "./components/tags/READ_ALONG";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ANAGRAM" element={<ANAGRAM />} />
        <Route path="/CONTENT_ONLY" element={<CONTENT_ONLY />} />
        <Route path="/CONVERSATION" element={<CONVERSATION />} />
        <Route path="/MCQ" element={<MCQ />} />
        <Route path="/READ_ALONG" element={<READ_ALONG />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;