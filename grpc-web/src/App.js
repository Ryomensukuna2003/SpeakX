import React, { useEffect, useState } from 'react';
import { searchQuestions } from './QuestionServiceClient';

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    searchQuestions('example', 1, 5)
      .then(response => {
        setQuestions(response.questionsList);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  return (
    <div>
      <h1>Questions</h1>
      <ul>
        {questions.map(question => (
          <li key={question.id}>{question.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;