import { Rating, TextField } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createReviewThunk } from '../../../services/reviews-thunks';
import { formatDate } from '../../../utils/format-date';
import './index.css';

const AddReviewComponent = () => {
    let [reviewComment, setReviewComment] = useState('');
    let [rating, setRating] = useState(0);
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const paths = pathname.split('/')
    const productId = paths[2];
    const { currentUser } = useSelector((state) => state.user);

    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

    const reviewClickHandler = (event) => {
        event.preventDefault()
        const newReview = {
            comment: reviewComment,
            product_id: productId,
            user_id: currentUser._id,
            userFirstName: currentUser.firstName,
            userLastName: currentUser.lastName,
            rating: rating || 0,
            date: formatDate(new Date())
        }

        dispatch(createReviewThunk(newReview));
        setIsReviewFormOpen(false)
    }

    return (
        <div>
            {
                !isReviewFormOpen &&
                <button onClick={() => { setIsReviewFormOpen(true) }} className='wd-product-review-button-container'>
                    Write a product review
                </button>
            }
            {isReviewFormOpen &&
                <form onSubmit={reviewClickHandler}>
                    <div className='wd-add-review-overall-rating'>
                        <div>
                            Overall Rating
                        </div>
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(event) => setRating(event.target.value)}
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-textarea"
                            label="Write a review"
                            placeholder="What do you like or dislike about this product?"
                            multiline
                            fullWidth
                            style={{ color: "blue" }}
                            onChange={(event) => setReviewComment(event.target.value)}
                        />
                    </div>

                    <div className='wd-add-review-action-buttons-container'>
                        <button className='wd-add-review-cancel-action' onClick={() => { setIsReviewFormOpen(false) }}>
                            Cancel
                        </button>
                        <button type='submit' className='wd-add-review-submit-action'>
                            Submit
                        </button>
                    </div>
                </form>
            }
        </div>
    )
}

export default AddReviewComponent;