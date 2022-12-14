import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { useDispatch } from 'react-redux';
import FeedbackStands from './FeedbackStands';
import setDescriptionStyle from './setDescriptionStyle';
import { openFeedbackDialog } from './store/feedbackSlice';


function FeedbackListItem(props) {
	const dispatch = useDispatch();



	const getStarsContent = (props) => {
		let content = [];
		for (let i = 0; i < props; i++) {
			content.push(<Icon>star</Icon>);
		}
		return content;
	};//Here you get the render of how many stars each review have;


	return (
		<FuseAnimate animation="transition.fadeIn" duration={400} delay={100}>
			<Card
				className={clsx('cursor-pointer', props.className)}
				onClick={() => dispatch(openFeedbackDialog(props.feedback.id))}
			>
				{/* {props.feedback.image && props.feedback.image !== '' && (
					<img src={props.feedback.image} className="w-full block" alt="feedback" />  //-> posibilitate de a atasa imagine ulterior
				)} */}

				{props.feedback.issuedBy && props.feedback.issuedBy !== '' && (
					<Typography className="p-16 pb-8 text-14 font-bold">{props.feedback.issuedBy}</Typography>
				)}

				{props.feedback.comment && props.feedback.comment !== '' && (
					<Typography className="py-8 px-16" component="div">
						<div
							className={clsx('w-full break-words', props.variateDescSize ? 'font-200' : 'text-14')}
							ref={el => {
								setTimeout(() =>
									setDescriptionStyle(props.feedback.comment, el, props.variateDescSize)
								);
							}}
						>
							{props.feedback.comment}
						</div>
					</Typography>
				)}


				{(props.feedback.rating) && (
					<div className="py-8 px-16 flex flex-wrap w-full -mx-2">
						{getStarsContent(props.feedback.rating)}
						<FeedbackStands id={props.feedback.rating} key={props.feedback.rating} className="mt-4 mx-2 max-w-full" linkable />
					</div>//here was rendered STARS + RATING NUMBER
				)}
			</Card>
		</FuseAnimate>
	);
}

export default FeedbackListItem;
