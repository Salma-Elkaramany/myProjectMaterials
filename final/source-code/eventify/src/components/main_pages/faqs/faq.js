

const Faq = ({data}) => {
    return (
        <div className="faq mt-4">
            <div className="question">
                <p>Question: </p>
                <p>{data.name}</p>
            </div>
            <div className="answer">
                <p>Answer: </p>
                <p>{data.answer}</p>
            </div>
        </div>
    );
}

export default Faq;