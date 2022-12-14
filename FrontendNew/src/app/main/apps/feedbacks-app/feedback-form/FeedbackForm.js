import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { useForm, useUpdateEffect } from '@fuse/hooks';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Tooltip from '@material-ui/core/Tooltip';
import FeedbackModel from 'app/main/apps/feedbacks-app/model/FeedbackModel';
import ReviewStars from './ReviewStars';
import React, { useState, useRef } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import FeedbackFormLabelMenu from './FeedbackFormLabelMenu';
import FeedbackFormUploadImage from './FeedbackFormUploadImage';
import { useSelector } from 'react-redux';


function FeedbackForm(props) {

	const [showList, setShowList] = useState(false);
	const routeParams = useParams();



	const user = useSelector(({ auth }) => auth.user.name);
	const fullLabes = useSelector(({ feedbackApp }) => feedbackApp.labels.entities); //get FULL STANDS propreties
	const defaultRating = 2;//The default rating if nothing is passed;


	const { form: feedbackForm, handleChange, setForm } = useForm(
		_.merge(
			{},
			new FeedbackModel(),
			user ? { issuedBy: user } : null,
			props.feedback,
			routeParams.labelId ? { labelId: routeParams.labelId } : null,
			routeParams.id === 'archive' ? { archive: true } : null,
			routeParams.id === fullLabes.id ? { archive: true } : null,
			defaultRating ? { rating: defaultRating } : null,
		)
	);
	const { onChange } = props;

	//console.log(props)
	useUpdateEffect(() => {
		if (feedbackForm && onChange) {
			onChange(feedbackForm);
		}
	}, [feedbackForm, onChange]);

	function handleOnCreate(event) {
		if (!props.onCreate) {
			return;
		}
		GetStarsState();
		props.onCreate(feedbackForm);
	}

	function handleToggleList() {
		setShowList(!showList);
	}


	function handleGetStars(id) {
		setForm(
			_.setIn(
				feedbackForm,
				`rating`,
				feedbackForm.labelId.filter(_id => _id !== id)
			)
		);
	}


	//THE FUNCTION THAT RETURNS THE RATING(NUMBER OF STAR) --> FROM REVIEW STARS
	//this function is called on handleOnCreate(), when Create button is pressed
	const childStateRef = useRef();
	const GetStarsState = () => {
		const childState = childStateRef.current.getChildStars()
		console.log("THIS IS CHILD STATE: ", childState)
		feedbackForm.rating = childState
		console.log(feedbackForm)

	}


	function handleLabelsChange(labelId) {
		setForm(_.setIn(feedbackForm, `labelId`, labelId));
	}

	function handleRemoveImage() {
		setForm(_.setIn(feedbackForm, `image`, ''));
	}

	function handleArchiveToggle() {
		setForm(_.setIn(feedbackForm, `archive`, !feedbackForm.archive));
		if (props.variant === 'new') {
			setTimeout(() => handleOnCreate());
		}
	}

	function handleUploadChange(e) {
		const file = e.target.files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();

		reader.readAsBinaryString(file);

		reader.onload = () => {
			setForm(_.setIn(feedbackForm, `image`, `data:${file.type};base64,${btoa(reader.result)}`));
		};

		reader.onerror = () => {
			console.log('error on load image');
		};
	}

	function newFormButtonDisabled() {
		return (
			feedbackForm.title === '' &&
			feedbackForm.image === '' &&
			feedbackForm.description === ''
		);
	}

	if (!feedbackForm) {
		return null;
	}

	return (
		<div className="flex flex-col w-full">
			<FuseScrollbars className="flex flex-auto w-full max-h-640">
				<div className="w-full">
					{feedbackForm.image && feedbackForm.image !== '' && (
						<div className="relative">
							<img src={feedbackForm.image} className="w-full block" alt="feedback" />
							<Fab
								className="absolute right-0 bottom-0 m-8"
								variant="extended"
								size="small"
								color="secondary"
								aria-label="Delete Image"
								onClick={handleRemoveImage}
							>
								<Icon fontSize="small">delete</Icon>
							</Fab>
						</div>
					)}
					<div className="p-16 pb-12">
						<Input
							placeholder="Write your review here..."
							multiline
							rows="4"
							name="comment"
							value={feedbackForm.description}
							onChange={handleChange}
							disableUnderline
							fullWidth
							autoFocus
						/>
					</div>

					<div className="flex flex-wrap w-full p-16 pb-12 -mx-4">
						<ReviewStars
							ref={childStateRef}
							onChange={GetStarsState}
						/>
					</div>

				</div>
			</FuseScrollbars>

			<div className="flex flex-auto justify-between items-center h-48">
				<div className="flex items-center px-4">

					<Tooltip title="Add image" placement="bottom">
						<div>
							<FeedbackFormUploadImage onChange={handleUploadChange} />
						</div>
					</Tooltip>


					<Tooltip title="Change Stand" placement="bottom">
						<div>
							<FeedbackFormLabelMenu feedback={feedbackForm} onChange={handleLabelsChange} />
						</div>
					</Tooltip>

					<Tooltip title={feedbackForm.archive ? 'Unarchive' : 'Archive'} placement="bottom">
						<div>
							<IconButton
								className="w-32 h-32 mx-4 p-0"
								onClick={handleArchiveToggle}
								disabled={newFormButtonDisabled()}
							>
								<Icon fontSize="small">{feedbackForm.archive ? 'unarchive' : 'archive'}</Icon>
							</IconButton>
						</div>
					</Tooltip>
				</div>
				<div className="flex items-center px-4">
					{props.variant === 'new' ? (
						<Button
							className="m-4"
							onClick={handleOnCreate}
							variant="outlined"
							size="small"
							disabled={newFormButtonDisabled()}
						>
							Create
						</Button>
					) : (
						<>
							<Tooltip title="Delete feedback" placement="bottom">
								<IconButton className="w-32 h-32 mx-4 p-0" onClick={props.onRemove}>
									<Icon fontSize="small">delete</Icon>
								</IconButton>
							</Tooltip>
							<Button className="m-4" onClick={props.onClose} variant="outlined" size="small">
								Close
							</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

FeedbackForm.propTypes = {};
FeedbackForm.defaultProps = {
	variant: 'edit',
	feedback: null
};

export default withRouter(FeedbackForm);
