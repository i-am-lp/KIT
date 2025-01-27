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
            <h1 className='newsletter--header'>KIT: Issue No. 1</h1>

            <div className='newsletter--updates'>
                <h2>Updates</h2>
                <div>
                    {data.map((item, index) => (
                        <div key={index}>
                            <p><strong>{item.name}</strong>: {item.update_text}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='newsletter--questions'>
                <h2>Questions</h2>
                <div>
                {data.map((question) => (
                    <div key={question.id} className='newsletter--question__question'>
                        <p>
                            <strong>{question.name}:</strong> {question.question}
                        </p>

                        {responses
                            .filter((response) => response.question_id === question.id)
                            .map((response) => (
                                <p key={response.id} className='newsletter--question__response'>
                                    <strong>{response.name}:</strong> {response.response}
                                </p>
                            ))}
                    </div>
                ))}
                </div>
            </div>

            <div className='newsletter--images'>
                <h2>Images</h2>
                <div>
                    {data.map((item, index) => (
                        <img
                            key={index}
                            src={`${API_URL}/${item.image}`}
                            alt={`Newsletter image ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MainPage;
