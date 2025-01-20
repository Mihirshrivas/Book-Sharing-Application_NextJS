import React, { useState } from 'react';
import AddBookModal from '../components/AddBookModal';

const ExploreBooksPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="header">
        <h1>Explore Books</h1>
        <button 
          className="add-book-btn"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Book
        </button>
      </div>

      {/* Rest of your existing explore books page code */}

      <AddBookModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ExploreBooksPage; 