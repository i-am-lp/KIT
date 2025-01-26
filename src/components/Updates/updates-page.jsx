import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const API_URL = import.meta.env.VITE_APP_API_URL;

function UpdatePage() {
  const [formData, setFormData] = useState({
    update_text: '',
    question: '',
    image: null,
  });

  const navigate = useNavigate();

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


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error('User is not logged in.');
      return;
    }

    const updateData = new FormData();
    updateData.append('name', user.name);
    updateData.append('user_id', user.id);
    updateData.append('update_text', formData.update_text);
    updateData.append('question', formData.question);
    updateData.append('image', formData.image);

    try {
      const res = await fetch(`${API_URL}/api/update/new`, {
        method: 'POST',
        body: updateData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const result = await res.json();
      console.log('Update successfully added:', result);

      navigate('/newsletter');
    } catch (error) {
      console.error('Error adding update:', error);
    }
  };

  return (
    <div className='updates'>
      <h1 className='updates--header'>let's Keep In Touch</h1>
      <form onSubmit={handleSubmit}  className='updates--form'>
        <div className='updates--form--check-in'>
          <label htmlFor="update_text" className='updates--form--check-in__header'>🧑‍💻 What's been going on?</label>
          <textarea
            id="update_text"
            name="update_text"
            placeholder='Write something here...'
            className='updates--form--check-in__box'
            value={formData.update_text}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='updates--form--question'>
          <label htmlFor="question" className='updates--form--question__header'>🔎 Let's get deep:</label>
          <input
            id="question"
            name="question"
            placeholder='Ask your question here...'
            className='updates--form--question__box'
            type="text"
            value={formData.question}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='updates--form--image'>
          <label htmlFor="image" className='updates--form--image__header'>📸 Photo Wall</label>
          <label htmlFor="image" className='updates--form--image__subheader'>Upload your fav picture here!</label>
          <input
            id="image"
            name="image"
            className='updates--form--image__box'
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className='updates--form--submit'>Share Your Update</button>
      </form>
    </div>
  );
};

export default UpdatePage;
