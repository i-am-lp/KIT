import './main-newsletter.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

function MainPage() {
    const [data, setData] = useState([]); 
    const [responses, setResponses] = useState([]);
    const [responseText, setResponseText] = useState({});
    const [formData, setFormData] = useState({
        question_id: "",
        response: "",
    });

    const decodeJWT = (token) => {
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
              .join('')
          );
          return JSON.parse(jsonPayload);
        } catch (error) {
          console.error('Failed to decode JWT:', error);
          return null;
        }
      };
    
    const token = localStorage.getItem('token');
    const user = token ? decodeJWT(token) : null;


    const handleSubmit = async (e, question_id) => {
        e.preventDefault();
    
        const response = responseText[question_id];
        if (!response) {
          console.error("Response is required.");
          return;
        }

        const payload = {
            name: user.name, 
            user_id: user.id,
            response: response, 
            question_id: question_id,
          };
        
        console.log("Payload being sent:", payload);
    
        try {
          const res = await fetch(`${API_URL}/api/newsletter/answers/new`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: user.name,
              user_id: user.user_id,
              response: responseText[question_id],
              question_id: question_id,
            }),
          });
    
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
    
          const result = await res.json();
          console.log("Response added successfully:", result);
    
          setResponses((prev) => [
            ...prev,
            {
              id: result.id, 
              name: user.name,
              response: responseText[question_id],
              question_id: question_id,
            },
          ]);
      
          setResponseText((prev) => ({
            ...prev,
            [question_id]: "",
          }));
        } catch (error) {
          console.error("Error adding response:", error);
        }
    };
      


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
                <button type="submit" className='newsletter--add-update'>
                    <a href="/updates" className='newsletter--add-update--link'>Add your update</a>
                </button>
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

                <div className="newsletter--questions">
                <h3 className="newsletter--questions__title">🔎 Well, since you asked</h3>
                <div className="newsletter--questions__responses">
                    {data.map((question) => (
                    <div key={question.id} className="newsletter--questions__responses--box">
                        <div className="newsletter--questions__question">
                        <p className="newsletter--questions__responses--text__question">
                            <b>{question.name} asked:</b> {question.question}
                        </p>
                        </div>
                        <div className="newsletter--questions__answers">
                        {responses
                            .filter((response) => response.question_id === question.id)
                            .map((response) => (
                            <p
                                key={response.id}
                                className="newsletter--questions__responses--text"
                            >
                                <b>{response.name}:</b> {response.response}
                            </p>
                            ))}
                        </div>
                        <form onSubmit={(e) => handleSubmit(e, question.id)}>
                        <input
                            type="text"
                            className="newsletter--questions__responses--text__input-box"
                            name={`response_${question.id}`}
                            value={responseText[question.id] || ""}
                            onChange={(e) =>
                            setResponseText((prev) => ({
                                ...prev,
                                [question.id]: e.target.value,
                            }))
                            }
                            placeholder="Write your response..."
                        />
                        <button type="submit" className="newsletter--questions__responses--text__button">Submit</button>
                        </form>
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
