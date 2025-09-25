import React, { useState } from "react";
import { glimmerQuestions, Question } from "../../data/questionnaireData";
import { QuestionnaireUpdateRequest } from "../../services/apiService";

interface QuestionnaireProps {
  onComplete: (data: QuestionnaireUpdateRequest) => void;
  onSkip: () => void;
}

function Questionnaire({ onComplete, onSkip }: QuestionnaireProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswerSelect = (questionId: number, answerKey: string) => {
    const newAnswers = { ...answers, [questionId]: answerKey };
    setAnswers(newAnswers);

    if (currentQuestionIndex < glimmerQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete({ answers: newAnswers });
    }
  };

  const currentQuestion: Question = glimmerQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / glimmerQuestions.length) * 100;

  return (
    <div className="form-container">
      <div className="questionnaire-header">
        <h2 className="questionnaire-title">
          Question {currentQuestionIndex + 1} of {glimmerQuestions.length}
        </h2>
        <button onClick={onSkip} className="skip-button">
          Skip for now
        </button>
      </div>
      <div className="progress-bar-bg">
        <div
          className="progress-bar-fg"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="question-text">{currentQuestion.text}</p>
      <div className="answer-options">
        {(
          Object.keys(currentQuestion.answers) as Array<
            keyof typeof currentQuestion.answers
          >
        ).map(
          (key) =>
            currentQuestion.answers[key] && (
              <div
                key={key}
                onClick={() => handleAnswerSelect(currentQuestion.id, key)}
                className="answer-option"
              >
                {currentQuestion.answers[key]}
              </div>
            )
        )}
      </div>
    </div>
  );
}
export default Questionnaire;
