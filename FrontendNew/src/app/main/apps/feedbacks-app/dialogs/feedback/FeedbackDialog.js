import { useDebounce } from '@fuse/hooks';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import FeedbackForm from '../../feedback-form/FeedbackForm';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeFeedbackDialog, removeFeedback, updateFeedback } from '../../store/feedbackSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function FeedbackDialog(props) {
	const dispatch = useDispatch();
	const feedbacks = useSelector(({ feedbackApp }) => feedbackApp.feedbacks);

	const handleOnChange = useDebounce(feedback => {
		dispatch(updateFeedback(feedback));
	}, 600);

	function handleOnRemove() {
		dispatch(removeFeedback(feedbacks.feedbackDialogId));
	}

	if (!feedbacks.entities) {
		return null;
	}

	return (
		<Dialog
			classes={{
				paper: 'w-full m-24 rounded-8'
			}}
			TransitionComponent={Transition}
			onClose={ev => dispatch(closeFeedbackDialog())}
			open={Boolean(feedbacks.feedbackDialogId)}
		>
			<FeedbackForm
				feedback={feedbacks.entities[feedbacks.feedbackDialogId]}
				onChange={handleOnChange}
				onClose={ev => dispatch(closeFeedbackDialog())}
				onRemove={handleOnRemove}
			/>
		</Dialog>
	);
}

export default FeedbackDialog;
