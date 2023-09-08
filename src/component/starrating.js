import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { BASE_URL } from '../Constant/Index';
import { Toaster, toast } from 'react-hot-toast';

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (index) => {
    if (index === rating) {
      // If the same star is clicked again, deselect it (set rating to 0).
      setRating(0);
    } else {
      // Otherwise, set the rating to the clicked star index or half of it.
      setRating(index);
    }
  };
      // storedUserId
    const customer_id = localStorage.getItem("userInfo");
    let storedUserId = JSON.parse(customer_id);
    // =----------------------------

  const [responseMessage, setResponseMessage] = useState("");
  const [comment, setcomment] = useState("");
  const [order_id, setorder_id] = useState("");
  const [item_id, setitem_id] = useState("");

  const handleReview = (event) => {
    event.preventDefault();
    const data = {
      user_id:storedUserId,
      item_id:"",
      order_id:"",
      comment: comment,
      rating: rating,
    };
    axios
      .post(`${BASE_URL}/items/reviews/submit`, data)
      .then((response) => {
        setResponseMessage(response.data.message);
        toast.success("Review Add Successfully");
      })
      .catch((error) => {
        toast.error("Field is required");
      });
  };

  return (
    <>
      <Toaster />
      <h2>Star Rating: {rating} stars</h2>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className={`star ${index <= rating ? 'filled' : ''}`}
            onClick={() => handleStarClick(index)}
          ></div>
        ))}
      </div>
      <form>
        <div className="form-group">
          <label >Write a Review</label>
          <textarea className="form-control" rows={3} value={comment}
            onChange={(e) => setcomment(e.target.value)} />
        </div>
      </form>
        <Button onClick={handleReview}>Submit</Button>
    </>
  );
};

export default StarRating;
