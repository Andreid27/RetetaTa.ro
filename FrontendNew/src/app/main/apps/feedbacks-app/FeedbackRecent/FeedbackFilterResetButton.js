import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { resetFeedbacksFilterDate, resetFeedbacksFilterStars } from '../store/feedbackSlice';

function FeedbackFilterResetButton() {
    const dispatch = useDispatch();
    const filterStars = useSelector(({ feedbackApp }) => feedbackApp.feedbacks.filterStars);
    const filterDate = useSelector(({ feedbackApp }) => feedbackApp.feedbacks.filterDate);

    function handleReset() {
        dispatch(resetFeedbacksFilterDate());
        dispatch(resetFeedbacksFilterStars());
    }


    return !filterStars && !filterDate ? (
        <span></span>
    ) : (
        <a onClick={handleReset}> Reset All Filters</a >
    );
}

export default withRouter(FeedbackFilterResetButton);
