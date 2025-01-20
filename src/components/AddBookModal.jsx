import React, { useState } from 'react';
import './AddBookModal.css';

const AddBookModal = ({ isOpen, onClose }) => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    condition: 'Good',
    coverImage: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle book submission logic here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={bookData.title}
              onChange={(e) => setBookData({...bookData, title: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Author:</label>
            <input
              type="text"
              value={bookData.author}
              onChange={(e) => setBookData({...bookData, author: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Genre:</label>
            <select
              value={bookData.genre}
              onChange={(e) => setBookData({...bookData, genre: e.target.value})}
              required
            >
              <option value="">Select Genre</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Mystery">Mystery</option>
              <option value="Thriller">Thriller</option>
              <option value="Science Fiction">Science Fiction</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={bookData.description}
              onChange={(e) => setBookData({...bookData, description: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Condition:</label>
            <select
              value={bookData.condition}
              onChange={(e) => setBookData({...bookData, condition: e.target.value})}
            >
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
          </div>

          <div className="form-group">
            <label>Cover Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBookData({...bookData, coverImage: e.target.files[0]})}
            />
          </div>

          <div className="modal-buttons">
            <button type="submit" className="submit-btn">Add Book</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal; 