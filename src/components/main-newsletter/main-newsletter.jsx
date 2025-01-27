import './main-newsletter.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

function MainPage() {
    const [data, setData] = useState([]); 
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newsletterResponse = await axios.get(`${API_URL}/api/newsletter/`);
                const newsletterData = Array.isArray(newsletterResponse.data)
                    ? newsletterResponse.data
                    : [];

                const responsesResponse = await axios.get(`${API_URL}/api/newsletter/answers/`);
                const responsesData = Array.isArray(responsesResponse.data)
                    ? responsesResponse.data
                    : [];

                setData(newsletterData);
                setResponses(responsesData);
            } catch (error) {
                console.error("Error fetching updates:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='newsletter'>
            <div className='newsletter--card'>
                <h1 className='newsletter--header'>🌿 KIT: Issue No. 1</h1>

                <div className='newsletter--updates'>
                    <h3 className='newsletter--updates__title'>🧑‍💻 You've all got a lot going on!</h3>
                    <div className='newsletter--updates__responses'>
                        {data.map((item, index) => (
                            <div key={index} className='newsletter--updates__responses--box'>
                                <p className='newsletter--updates__responses--text'><b>{item.name}</b>: {item.update_text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='newsletter--questions'>
                    <h3 className='newsletter--questions__title'>🔎 Well, since you asked</h3>
                    <div className='newsletter--questions__responses'>
                    {data.map((question) => (
                        <div key={question.id} className='newsletter--questions__responses--box'>
                            <p className='newsletter--questions__responses--text__question'>
                                <b>{question.name} asked:</b> {question.question}
                            </p>

                            {responses
                                .filter((response) => response.question_id === question.id)
                                .map((response) => (
                                    <p key={response.id} className='newsletter--questions__responses--text'>
                                        <b>{response.name}:</b> {response.response}
                                    </p>
                                ))}
                        </div>
                    ))}
                    </div>
                </div>

                <div className='newsletter--images'>
                    <h3 className='newsletter--images__title'>📸 Worth 1,000 words</h3>
                    <div className='newsletter--images__block'>
                        {data.map((item, index) => (
                            <img
                                key={index}
                                className='newsletter--images__img'
                                src={`${API_URL}/${item.image}`}
                                alt={`Newsletter image ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
