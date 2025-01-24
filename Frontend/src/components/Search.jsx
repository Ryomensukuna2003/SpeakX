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
      <div className="mb-6">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-black text-white rounded hover:bg-neutral-600"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p
              key={tag}
              className={`cursor-pointer rounded p-2 border ${selectedTags.includes(tag) ? "bg-black text-white" : "bg-white text-black border-black"
                }`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </p>
          ))}
        </div>
      </div>

      {/* Cards */}
      <button className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {searchResults.map((question) => (
          <div
            key={question.id}
            className="p-4 border text-left rounded hover:shadow-lg transition-shadow relative"
          >
            <button className="text-lg p-2 text-left font-semibold" onClick={() => findByID(question.id, question.type)}>{question.title}</button>
            <p className="text-sm text-gray-500 absolute bottom-2 right-2">{question.type}</p>
          </div>
        ))}
      </button>
      <div className="flex justify-center items-center">
        <button className="p-1 rounded bg-neutral-200 m-2" onClick={() => prevPage()}><ChevronLeft /></button>
        <p>{currentPage} of {totalPages}</p>
        <button className="p-1 rounded bg-neutral-200 m-2" onClick={() => nextPage()}><ChevronRight /></button>
      </div>
    </div>
  );
}
