import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/reviews";
import { getSpotThunk } from "../../store/spots";
import "./SpotReviews.css";

export const DeleteReviewModal = ({ reviewId, spotId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleClick = (e) => {
        e.preventDefault();

        dispatch(deleteReviewThunk(reviewId, spotId))
            .then(() => dispatch(getSpotThunk(spotId)))
            .then(closeModal);
    };

    return (
        <div className="delete-review-modal-content">
            <div className="delete-review-container">
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to delete this review?</p>
                <div className="yes-no-container">
                    <button className="yes-button" type="button" onClick={handleClick}>
                        Yes (Delete Review)
                    </button>
                    <button className="no-button" type="button" onClick={closeModal}>
                        No (Keep Review)
                    </button>
                </div>
            </div>
        </div>
    );
};
