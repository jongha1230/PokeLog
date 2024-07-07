import { useState } from "react";

function RecommendPokemonPage() {
  const [answers, setAnswers] = useState({ q1: "", q2: "", q3: "", q4: "" });

  const handleAnswer = (question: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [question]: answer }));
  };

  return (
    <div className="bg-purple-100 p-8 rounded-lg h-2/3 shadow-md">
      <h2 className="text-2xl mb-4">MBTI에 따른 포켓몬 추천</h2>
      <div className="mb-4">
        <h3 className="mb-2">1 번째 질문, 외향, 내향</h3>
        <div className="flex space-x-4">
          <button
            className={`py-2 px-4 rounded ${
              answers.q1 === "외향" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleAnswer("q1", "외향")}
          >
            외향
          </button>
          <button
            className={`py-2 px-4 rounded ${
              answers.q1 === "내향" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleAnswer("q1", "내향")}
          >
            내향
          </button>
        </div>
        <h3 className="mb-2 mt-4">2 번째 질문, 경험, 느낌</h3>
        <div className="flex space-x-4">
          <button
            className={`py-2 px-4 rounded ${
              answers.q2 === "경험" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleAnswer("q2", "경험")}
          >
            경험
          </button>
          <button
            className={`py-2 px-4 rounded ${
              answers.q2 === "느낌" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleAnswer("q2", "느낌")}
          >
            느낌
          </button>
        </div>
        <h3 className="mb-2 mt-4">3 번째 질문, 논리, 감정</h3>
        <div className="flex space-x-4">
          <button
            className={`py-2 px-4 rounded ${
              answers.q3 === "논리" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleAnswer("q3", "논리")}
          >
            논리
          </button>
          <button
            className={`py-2 px-4 rounded ${
              answers.q3 === "감정" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleAnswer("q3", "감정")}
          >
            감정
          </button>
        </div>
        <h3 className="mb-2 mt-4">4 번째 질문, 판단, 인식 </h3>
        <div className="flex space-x-4">
          <button
            className={`py-2 px-4 rounded ${
              answers.q4 === "판단" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleAnswer("q4", "판단")}
          >
            계획
          </button>
          <button
            className={`py-2 px-4 rounded ${
              answers.q4 === "답변 2" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleAnswer("q4", "답변 2")}
          >
            흐름
          </button>
        </div>
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:brightness-90"
        onClick={() => {
          console.log("제출된 답변:", answers);
        }}
      >
        제출? or 다음
      </button>
    </div>
  );
}

export default RecommendPokemonPage;
