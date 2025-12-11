import React, { useEffect, useState } from "react"
import "../assets/CSS/Quizz.css"
import Result from './Result'
import ProgressBar from "./ProgressBar";
const quizzData = [
  {
    "question": "Hệ điều hành nào là mã nguồn mở?",
    "options": ["Windows", "macOS", "Linux", "iOS"],
    "answer": 2
  },
  {
    "question": "HTML được sử dụng để làm gì?",
    "options": ["Tạo cấu trúc trang web", "Thiết kế đồ họa 3D", "Lập trình hệ điều hành", "Quản trị mạng"],
    "answer": 0
  },
  {
    "question": "CSS được sử dụng chủ yếu cho?",
    "options": ["Xử lý logic", "Tạo kiểu giao diện trang web", "Lập trình CSDL", "Tạo câu lệnh API"],
    "answer": 1
  },
  {
    "question": "JavaScript thường dùng để?",
    "options": ["Tạo hiệu ứng động trên website", "Thiết kế UI bằng CSS", "Lập trình hệ thống nhúng", "Xây dựng CSDL"],
    "answer": 0
  },
  {
    "question": "CPU là viết tắt của?",
    "options": ["Central Process Unit", "Center Programming Unit", "Central Processing Unit", "Computer Program Utility"],
    "answer": 2
  },
  {
    "question": "RAM là bộ nhớ gì?",
    "options": ["Bộ nhớ chỉ đọc", "Bộ nhớ ngẫu nhiên", "Ổ đĩa lưu trữ", "Bộ nhớ ngoài"],
    "answer": 1
  },
  {
    "question": "Từ viết tắt CSDL là?",
    "options": ["Cơ sở dữ liệu", "Công suất điện lớn", "Cung cấp dữ liệu lớn", "Câu lệnh dữ liệu lập trình"],
    "answer": 0
  },
  {
    "question": "SQL được sử dụng để?",
    "options": ["Tạo hình ảnh 3D", "Thiết kế vi xử lý", "Truy vấn và quản lý dữ liệu", "Tạo hệ điều hành"],
    "answer": 2
  },
  {
    "question": "Git dùng để làm gì?",
    "options": ["Lưu trữ code theo phiên bản", "Tạo hình ảnh đồ họa", "Tăng tốc CPU", "Cài đặt hệ điều hành"],
    "answer": 0
  },
  {
    "question": "React là gì?",
    "options": ["Thư viện JavaScript xây dựng UI", "Ngôn ngữ lập trình mới", "Framework cho Java", "CSDL dạng NoSQL"],
    "answer": 0
  }
]


function Quizz(){

  const [userAnswers,setUserAnswers] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [endAnswers,setEndAnswers] = useState(false)
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0)

  const handleSelectAnswer = (optionIndex) => {
     setSelectedAnswer(optionIndex)
     setUserAnswers(prev => {
    const next = [...prev];
    next[currentQuestion] = optionIndex;
    return next;
  })
  }

  const restoreQuizz = () => {
    setUserAnswers([])
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setEndAnswers(false)
    setShowResult(false)
    setScore(0)
  }

  const goNext = () => {
    
  if (currentQuestion < quizzData.length - 1) { 
    setCurrentQuestion((pre) => pre + 1);
  }
  if(endAnswers){
    setShowResult(true)
  }
}

 const goBack = () => {
  if (currentQuestion > 0) {
    setCurrentQuestion((pre) => pre - 1);
  }
}

useEffect(() => {
  if (
    userAnswers.length === quizzData.length &&
    !userAnswers.some(ans => ans === undefined)
  ) {
    setEndAnswers(true)
  }
}, [userAnswers])


useEffect(() => {
   const answer = userAnswers[currentQuestion];
   
    if (answer !== undefined) {
      setSelectedAnswer(answer)
    } else {
      setSelectedAnswer(null)
    }
},[currentQuestion,userAnswers])

useEffect(() => {
  if(selectedAnswer === quizzData[currentQuestion].answer){
    setScore(prev => prev + 1)
  }
},selectedAnswer)

  if(showResult){
    return <Result
              score={score}
              totalQuestionNum={quizzData.length}
              restoreQuizz={restoreQuizz}
          />
  }

    return(
        <>
          <div className="quizz">
            <ProgressBar  progress={(currentQuestion + 1) / quizzData.length * 100}></ProgressBar>
              <div className="question">
                <h2>{quizzData[currentQuestion].question}</h2>
                <ul className="answers">
                  {quizzData[currentQuestion].options.map((option,optionIndex)=>(
                    <li key={option}>
                      <button className={                       
                         selectedAnswer !== null
                         ? optionIndex === quizzData[currentQuestion].answer
                            ? "correct"
                            : optionIndex === selectedAnswer
                            ? "wrong"
                            : ""
                        : ""                                             
                      } 
                      disabled = {selectedAnswer !== null}
                        onClick={()=>handleSelectAnswer(optionIndex)}>{option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="nav-button">
                <button onClick={goBack}>Previous</button>
                <button onClick={goNext}>{endAnswers?"Complete":"Next"}</button>
              </div>
          </div>
        </>
    )
}

export default Quizz