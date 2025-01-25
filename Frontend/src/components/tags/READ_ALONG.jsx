import React, { useEffect } from 'react'
import { useSearchParams } from "react-router-dom";
import { getQuestion } from '../../QuestionServiceClient';

const READ_ALONG = () => {
  const [searchParams] = useSearchParams();
  const [question, setQuestion] = React.useState(null);
  const id = searchParams.get("id");

  useEffect(() => {
    getQuestion(id)
      .then((response) => {
        setQuestion(response);
      })
      .catch((error) => {
        console.error("error: ", error);
      });
  }, [id])
  return (
    <div className='container'>
      <div className='content'>
        <div className='title'>{question?.type.charAt(0).toUpperCase() + question?.type.slice(1).toLowerCase()}</div>
        <div className='subtitle'>Read the Question and choose the most correct option</div>
        <div>{question?.title}</div>
      </div>
    </div>
  )
}

export default READ_ALONG