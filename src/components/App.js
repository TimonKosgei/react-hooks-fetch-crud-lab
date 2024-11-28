import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import QuestionItem from "./QuestionItem";

function App() {
  const [page, setPage] = useState("List");
  const [questions,setQuestions] = useState([])
  

  function addNewQuestion(fdata){
    setQuestions((prev)=>[...prev,fdata])
  }
  function changeAnswer(answer,id){
    const updatedData = {
      correctIndex:answer
    }
    
    setQuestions((prev) =>  prev.map(question =>question.id === id? {...question,...updatedData }: question ))
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(updatedData), 
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); 
      })
      .then((result) => {
        console.log("Update successful:", result);
      })
      .catch((error) => {
        console.error("Error updating question:", error); 
      });
  }

  function deleteQuestion(id){
    console.log('clicked')
    
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE"})
      .then((response) => {
        if (!response.ok) {

          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); 
      })
      .then((result) => {
        setQuestions((prev)=> prev.filter((questions)=> questions.id !== id))
        console.log("Delete successful:", result); // Handle success
      })
      .catch((error) => {
        console.error("Error deleting question:", error); // Handle errors
      });
  }

  
  const lielements = questions.map((question, index)=>{
    return(<QuestionItem key={index} changeAnswer={changeAnswer} question={question} deleteQuestion={deleteQuestion}/>   )
  })

  useEffect(()=>{
    fetch('http://localhost:4000/questions')
    .then(res => res.json())
    .then(data => setQuestions(data))
  },[])
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addNewQuestion={addNewQuestion} /> : <QuestionList questionsPrompts={lielements} changeAnswer={changeAnswer}/>}
    </main>
  );
}

export default App;
