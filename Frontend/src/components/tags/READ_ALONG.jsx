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
    <div className='flex justify-center items-center min-h-screen px-[20%]'>
      <div className='flex-col m-auto p-4 border-neutral-600 border-2 rounded'>
        <div className='text-3xl'>{question?.type.charAt(0).toUpperCase() + question?.type.slice(1).toLowerCase()}</div>
        <div className='text-lg mt-4'>Read the Question and choose the most correct option</div>
        <div>{question?.title}</div>
      </div>
    </div>
  )
}

export default READ_ALONG