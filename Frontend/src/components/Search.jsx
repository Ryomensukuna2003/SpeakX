"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Updated proto imports for CommonJS style
const { QuestionServiceClient } = require("@/proto/questions_grpc_web_pb");
const { SearchRequest } = require("@/proto/questions_pb");

const client = new QuestionServiceClient("http://localhost:8080", null, null);
const tags = ["MCQ", "Anagram", "Read Along"];

const ITEMS_PER_PAGE = 9;

export default function SearchWithTags() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleTagClick = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };

  const handleSearch = () => {
    setIsLoading(true);
    const request = new SearchRequest();
    request.setQuery(searchTerm);
    request.setPage(currentPage);
    request.setLimit(ITEMS_PER_PAGE);

    // Add tags to request if your proto supports it
    selectedTags.forEach(tag => request.addTags(tag));

    client.searchQuestions(request, {}, (err, response) => {
      setIsLoading(false);
      if (err) {
        console.error("Error fetching questions:", err);
        return;
      }

      try {
        // Get questions from the response
        const questionsList = response.getQuestionsList();

        // Map the questions to a more usable format
        const results = questionsList.map((q) => ({
          id: q.getId(),
          title: q.getTitle(),
          type: q.getType(),
          tags: q.getTagsList()
        }));

        setSearchResults(results);
        setTotalPages(Math.max(1, Math.ceil(response.getTotalCount() / ITEMS_PER_PAGE)));
      } catch (error) {
        console.error("Error processing response:", error);
      }
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <div className="flex gap-2 mb-4">
          <Input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow"
          />
          <Button
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer rounded-sm"
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-500 my-8">
          Loading results...
        </div>
      ) : searchResults.length === 0 ? (
        <div className="text-center text-gray-500 my-8">
          No results found. Try adjusting your search terms.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
          {searchResults.map((question) => (
            <Card key={question.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{question.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{question.type}</p>
                {question.tags && question.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {question.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {searchResults.length > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                  handleSearch();
                }}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => {
                    setCurrentPage(index + 1);
                    handleSearch();
                  }}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                  handleSearch();
                }}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}