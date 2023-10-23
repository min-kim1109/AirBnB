import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteReviewThunk } from '../../store/reviews';
import './DeleteReview';


// defines functional component DeleteReviewModal that takes in reviewId prop as the argument
function DeleteReviewModal({ reviewId }) {
    // used to dispatch actions to the Redux store
    const dispatch = useDispatch();

    // useModal hook used to access the closeModal function
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        // prevent default behavior of an event
        e.preventDefault();

        // after action is created by thunk action creator
        // execute closeModal function
        await dispatch(deleteReviewThunk(reviewId)).then(closeModal)
    }
}

const noDelete = (e) => {
    // prevent default behavior of an event
    e.preventDefault();
    // closes modal
    closeModal();
}

return (
    <div className='delete-review-container'>
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to remove this review?</p>
        <div className='confirm-buttons'>
            <button
                id='yes-button'
                onClick={handleDelete}>
                Yes (Delete Review)
            </button>
            <button
                id='no-button'
                onClick={noDelete}>
                No (Keep Review)
            </button>
        </div>
    </div>
)

export default DeleteReviewModal;
