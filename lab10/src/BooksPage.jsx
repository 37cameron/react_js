import React, { useState } from 'react';

const BooksPage = ({ myList, addToList, addReview, reviews, addRating, ratings, finalizeReview }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [activeReview, setActiveReview] = useState(null);
  const [reviewDrafts, setReviewDrafts] = useState({});
  const [ratingDrafts, setRatingDrafts] = useState({});

  const searchBooks = async (event) => {
    event.preventDefault();
    /** books from api  */
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
    const data = await response.json();
    setBooks(data.items || []);
  };


  const handleSubmitReview = (book) => {
     /*  */
    addReview(book, reviewDrafts[book.id] || '');
    addRating(book, ratingDrafts[book.id] || null);
    finalizeReview(book);
    setActiveReview(null);
  };

  return (
    <section className="books-page">
      <form onSubmit={searchBooks} className="search-form">
        <input

          type="text"
          placeholder="Search for a book title..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="book-section">
        <h2>Search Results</h2>
        {books.length === 0 && <p>No books to display. Try searching something!</p>}
        <div className="book-grid">
          {books.map(book => (
              <div key={book.id} className="book-card">
              <img src={book.volumeInfo.imageLinks?.thumbnail || '#'} alt="Cover" className="book-cover" />
              <div className="book-info">
                <h4>{book.volumeInfo.title}</h4>


                <p>{book.volumeInfo.authors?.join(', ')}</p>
                <p><small>{book.volumeInfo.publishedDate}</small></p>
              </div>
              <button onClick={() => addToList(book)}>➕ Add to My List</button>
              {!reviews[book.id] && (
                <button onClick={() => setActiveReview(book.id)}>Write Review</button>
              )}
              {activeReview === book.id && (
                <div className="review-form">
                  <textarea
                    placeholder="Write your review here..."
                    value={reviewDrafts[book.id] || ''}
                    onChange={(e) => setReviewDrafts({ ...reviewDrafts, [book.id]: e.target.value })}
                  />
                  <label>Rating:
                    <select
                      value={ratingDrafts[book.id] || ''}
                      onChange={(event) => setRatingDrafts({ ...ratingDrafts, [book.id]: parseInt(event.target.value) })}
                    >
                      <option value="">Select</option>
                      {[1, 2, 3, 4, 5].map(n => (
                        <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </label>
                  <button className="submit-button" onClick={() => handleSubmitReview(book)}>Submit Review</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="book-section">
        <h2>My List</h2>
        <div className="book-grid">
          {myList.map(book => (
            <div key={book.id} className="book-card">
              <img src={book.volumeInfo.imageLinks?.thumbnail || '#'} alt="cover of the book" className="book-cover" />
              <div className="book-info">
                
                <h4>{book.volumeInfo.title}</h4>
                <p>{book.volumeInfo.authors?.join(', ')}</p>
                <p><small>{book.volumeInfo.publishedDate}</small></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BooksPage;
