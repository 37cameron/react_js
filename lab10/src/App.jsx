import React, { useState } from 'react';
import BooksPage from './BooksPage';
import ReviewsPage from './ReviewsPage';
import './style.css';

function App() {
  const [page, setPage] = useState('books');

  const [myList, setMyList] = useState([]);
  const [reviews, setReviews] = useState({});
  const [ratings, setRatings] = useState({});
  const [reviewedBooks, setReviewedBooks] = useState([]);



  /*my list */
  const addToList = (book) => {
    if (!myList.find(b => b.id === book.id)) {
      setMyList((prev) => [...prev, book]);
    }
  };

 /*create a review */
  const addReview = (book, review) => {
    setReviews((prev) => ({ ...prev, [book.id]: review }));
  };
 /*add rating*/
  const addRating = (book, rating) => {
    setRatings((prev) => ({ ...prev, [book.id]: rating }));
  };
 /*submit */
  const finalizeReview = (book) => {
    if (!reviewedBooks.find(b => b.id === book.id)) {
      setReviewedBooks((prev) => [...prev, book]);
    }
  };

  
  return (
    <div className="container">

        <header className="app-header">
        <h1>Book Review Hub</h1>
        <nav className="nav-buttons">
          <button onClick={() => setPage('books')} className="button">My Books</button>
          <button onClick={() => setPage('reviews')} className="button">My Reviews</button>
        </nav>
      </header>

      <main>
        {page === 'books' && (
          <BooksPage
            myList={myList}
            addToList={addToList}
            addReview={addReview}
            reviews={reviews}
            addRating={addRating}
            ratings={ratings}
            
            finalizeReview={finalizeReview}
          />
        )}
        {page === 'reviews' && (
          <ReviewsPage
            reviewedBooks={reviewedBooks}
            reviews={reviews}
            ratings={ratings}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Project 3 &copy; 2025</p>
      </footer>
    </div>
  );
}

export default App;
