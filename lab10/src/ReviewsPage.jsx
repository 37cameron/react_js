import React from 'react';

const ReviewsPage = ({ reviewedBooks, reviews, ratings }) => {
  return (
    <section className="reviews-page">
      <h2>My Reviews</h2>
      {reviewedBooks.length === 0 && <p>You have not reviewed any books yet.</p>}
      <div className="review-list">
        {reviewedBooks.map(book => (
          <div key={book.id} className="review-item">
            <img src={book.volumeInfo.imageLinks?.thumbnail || '#'} alt="Cover" className="review-cover" />
            <div className="review-details">
              <h4>{book.volumeInfo.title}</h4>
              <p><em>{book.volumeInfo.authors?.join(', ')}</em></p>
              <p><small>{book.volumeInfo.publishedDate}</small></p>
              {reviews[book.id] && <p><strong>Review:</strong> {reviews[book.id]}</p>}
              {ratings[book.id] && <p><strong>Rating:</strong> <span className="stars">{'★'.repeat(ratings[book.id])}</span></p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsPage;
