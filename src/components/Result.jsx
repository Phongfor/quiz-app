
function Result({score,totalQuestionNum,restoreQuizz}){

    return (
         <div className="result-screen">
            <h2>Kết quả Quiz</h2>

            <div className="summary-box">
                <p className="total">Tổng số câu: {totalQuestionNum}</p>
                <p className="correct">Số câu đúng: {score}</p>
                
            </div>

            <button className="restart-btn" onClick={restoreQuizz}>Làm lại Quiz</button>
        </div>
    )    
}

export default Result