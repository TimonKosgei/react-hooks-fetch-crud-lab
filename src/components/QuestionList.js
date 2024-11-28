import React from "react";

function QuestionList({questionsPrompts}) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionsPrompts}</ul>
    </section>
  );
}

export default QuestionList;
