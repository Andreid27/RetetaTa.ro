import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FeedbackForm from './feedback-form/FeedbackForm';
import { createFeedback } from './store/feedbackSlice';

const useStyles = makeStyles({
	button: {
		cursor: 'text'
	}
});

function NewFeedback(props) {
	const dispatch = useDispatch();


	const classes = useStyles(props);
	const [formOpen, setFormOpen] = useState(false);

	function handleFormOpen() {
		setFormOpen(true);
		document.addEventListener('keydown', escFunction, false);
	}

	function handleFormClose() {
		if (!formOpen) {
			return;
		}
		setFormOpen(false);
		document.removeEventListener('keydown', escFunction, false);
	}

	function handleCreate(feedback) {
		console.log(feedback)
		dispatch(createFeedback(feedback));
		handleFormClose();
	}

	function escFunction(event) {
		if (event.keyCode === 27) {
			handleFormClose();
		}
	}

	function handleClickAway(ev) {
		const preventCloseElements = document.querySelector('.prevent-add-close');
		const preventClose = preventCloseElements ? preventCloseElements.contains(ev.target) : false;
		if (preventClose) {
			return;
		}
		handleFormClose();
	}

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<Paper
				className={clsx(classes.button, 'flex items-center w-full max-w-512 mt-8 mb-16 min-h-48 rounded-8')}
				elevation={1}
			>
				{formOpen ? (
					<FeedbackForm onCreate={handleCreate} variant="new" />
				) : (
					<Typography
						className="w-full px-16 py-12 font-500 text-16 w-full"
						color="textSecondary"
						onClick={handleFormOpen}
					>
						Write your review..
					</Typography>
				)}
			</Paper>
		</ClickAwayListener>
	);
}

export default NewFeedback;
