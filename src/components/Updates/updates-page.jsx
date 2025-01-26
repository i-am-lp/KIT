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

    const updateData = new FormData();
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
    <div>
      <h1>let's Keep In Touch</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="update_text">What's been going on?</label>
          <textarea
            id="update_text"
            name="update_text"
            placeholder='Write something here...'
            value={formData.update_text}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="question">Let's get deep:</label>
          <input
            id="question"
            name="question"
            placeholder='Ask your question here...'
            type="text"
            value={formData.question}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdatePage;
