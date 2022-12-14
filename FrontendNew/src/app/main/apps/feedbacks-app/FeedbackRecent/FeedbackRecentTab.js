import Typography from '@material-ui/core/Typography';
import React from 'react';
import Masonry from 'react-masonry-css';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FeedbackListItem from '../FeedbackListItem';
import { selectFeedbacks } from '../store/feedbackSlice';

function FeedbackRecentTab(props) {
    const feedbacks = useSelector(selectFeedbacks);
    const searchText = useSelector(({ feedbackApp }) => feedbackApp.feedbacks.searchText);

    return !feedbacks || feedbacks.length === 0 ? (
        <div className="flex items-center justify-center h-full">
            <Typography color="textSecondary" variant="h5">
                There are no feedbacks!
            </Typography>
        </div>
    ) : (
        <div className="flex flex-wrap w-full">
            <Masonry
                breakpointCols={{
                    default: 6,
                    1920: 5,
                    1600: 4,
                    1366: 3,
                    1280: 4,
                    960: 3,
                    600: 2,
                    480: 1
                }}
                className="my-masonry-grid flex w-full"
                columnClassName="my-masonry-grid_column flex flex-col p-0 md:p-8"
            >
                {feedbacks.map(feedback => (
                    <FeedbackListItem
                        key={feedback.id}
                        feedback={feedback}
                        className="w-full rounded-8 mb-16"
                    // variateDescSize={variateDescSize}
                    />
                ))}
            </Masonry>
        </div>
    );
}

export default withRouter(FeedbackRecentTab);
