import React, { useEffect, useState } from "react";
import { searchQuestions } from '../QuestionServiceClient';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";
const tags = ["MCQ", "ANAGRAM", "READ_ALONG", "CONVERSATION", "CONTENT_ONLY"];
const ITEMS_PER_PAGE = 9;

export default function SearchWithTags() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleTagClick = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleSearch = () => {
    setIsLoading(true);
    const type = selectedTags.join(',');
    searchQuestions(searchTerm, page, ITEMS_PER_PAGE, type)
      .then(response => {
        const results = response.questionsList.map((q) => ({
          id: q.id,
          title: q.title,
          type: q.type,
        }));
        setTotalPages(response.totalpages);
        setCurrentPage(response.currentpage);
        setSearchResults(results);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
        setIsLoading(false);
      });
  };

  const findByID = (id, tag) => {
    console.log('ID:', id);
    console.log("Tag: ", tag);
    navigate(`/${tag}/?id=${id}`);
  }

  const nextPage = () => {
    if (searchResults.totalPages === page) return;
    setPage(() => page + 1);

    console.log('Next Page');
  }

  const prevPage = () => {
    if (page === 1) return;
    setPage(() => page - 1);
    console.log('Prev Page');
  }

  useEffect(() => {
    handleSearch();
  }, [page])

  return (
    <div>
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button
            onClick={handleSearch}
            className="search-button"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
        <div className="tags-container">
          {tags.map((tag) => (
            <p
              key={tag}
              className={`tag ${selectedTags.includes(tag) ? "selected" : ""}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </p>
          ))}
        </div>
      </div>

      {/* Cards */}
      <button className="cards-grid">
        {searchResults.map((question) => (
          <div
            key={question.id}
            className="card"
          >
            <button className="card-title" onClick={() => findByID(question.id, question.type)}>{question.title}</button>
            <p className="card-type">{question.type}</p>
          </div>
        ))}
      </button>
      <div className="pagination">
        <button className="pagination-button" onClick={() => prevPage()}><ChevronLeft /></button>
        <p>{currentPage} of {totalPages}</p>
        <button className="pagination-button" onClick={() => nextPage()}><ChevronRight /></button>
      </div>
    </div>
  );
}
