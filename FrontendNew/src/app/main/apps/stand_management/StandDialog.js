import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStand, addStand, closeNewStandDialog, closeEditStandDialog } from './store/standSlice';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useParams } from 'react-router';

const defaultFormState = {
	name: '',
	type: 'standard',
	banner: '',
	isStandard: true,
	isPremium: false,
	isGolden: false,
	ownerUsername: '',
	presentationLink: '',
	mediaLink: '',
	premiumPresentationLink: '',
	premiumMediaLink: '',
	goldenPresentationLink: '',
	goldenMediaLink: ''
};

function StandDialog(props) {
	const dispatch = useDispatch();
	const standDialog = useSelector(({ standApp }) => standApp.stands.standDialog);
	const routeParams = useParams();

	const [type, setType] = useState('standard');

	const { form, handleChange, setForm } = useForm(defaultFormState);

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (standDialog.type === 'edit' && standDialog.data) {
			setForm({ ...standDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (standDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...standDialog.data,
			});
		}

	}, [standDialog.data, standDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (standDialog.props.open) {
			initDialog();
		}
	}, [standDialog.props.open, initDialog]);

	function closeComposeDialog() {
		return standDialog.type === 'edit' ? dispatch(closeEditStandDialog()) : dispatch(closeNewStandDialog());
	}

	function canBeSubmitted() {
		return form.name.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (standDialog.type === 'new') {
			console.log(routeParams.id);
			dispatch(addStand({eventId: routeParams.id, stand: form}));
		} else {
			// for (const [key, value] of Object.entries(entitiesDialog)) {
			// 	if (value.name === form.name) {
			// 		form.id = value.id;
			// 	}
			// }
			dispatch(updateStand({eventId: routeParams.id, stand: form}));
		}
		closeComposeDialog();
	}

	function handleRemove() {
		closeComposeDialog();
	}

	function handleRadioButtonChange(event) {
		setType(event.target.value);
		form.type = type;
		switch(form.type) {
			case 'standard':
				form.isStandard = true;
				form.isPremium = false;
				form.isGolden = false;
				form.premiumPresentationLink = '';
				form.premiumMediaLink = '';
				form.goldenPresentationLink = '';
				form.goldenMediaLink = '';
				break;
			case 'premium':
				form.isStandard = true;
				form.isPremium = true;
				form.isGolden = false;
				form.premiumPresentationLink = '';
				form.premiumMediaLink = '';
				form.goldenPresentationLink = '';
				form.goldenMediaLink = '';				
				break;
			case 'golden':
				form.isStandard = true;
				form.isPremium = true;
				form.isGolden = true;
				form.premiumPresentationLink = '';
				form.premiumMediaLink = '';
				form.goldenPresentationLink = '';
				form.goldenMediaLink = '';
				break;
		}
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...standDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{standDialog.type === 'new' ? 'New Stand' : 'Edit Stand'}
					</Typography>
				</Toolbar>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>
					<div className="flex">
						<TextField
							className="mb-24"
							label="Stand Name"
							autoFocus
							id="name"
							name="name"
							value={form.name}
							onChange={handleChange}
							variant="outlined"
							required
							fullWidth
						/>
					</div>

					<div className="flex">
						<TextField
							className="mb-24"
							label="Banner Path"
							id="banner"
							name="banner"
							value={form.banner}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex">
						<FormControl>
							<RadioGroup
								row
								aria-labelledby="demo-row-radio-buttons-group-label"
								name="row-radio-buttons-group"
							>
								<FormControlLabel value="standard" control={<Radio />} label="Standard" onChange={handleRadioButtonChange}/>
								<FormControlLabel value="premium" control={<Radio />} label="Premium" onChange={handleRadioButtonChange}/>
								<FormControlLabel value="golden" control={<Radio />} label="Golden" onChange={handleRadioButtonChange}/>
							</RadioGroup>
						</FormControl>
					</div>

					<div className="flex">
						<TextField
							className="mb-24"
							label="Owner"
							id="ownerUsername"
							name="ownerUsername"
							value={form.ownerUsername}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex">
						<TextField
							className="mb-24"
							label="Presentation Link"
							id="presentationLink"
							name="presentationLink"
							value={form.presentationLink}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex">
						<TextField
							className="mb-24"
							label="Media Link"
							id="mediaLink"
							name="mediaLink"
							value={form.mediaLink}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>

					

					{(type === 'premium' || type === 'golden') &&
					<div className="premium">
						<div className="flex">
							<TextField
								className="mb-24"
								label="Premium Presentation Link"
								id="premiumPresentationLink"
								name="premiumPresentationLink"
								value={form.premiumPresentationLink}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
						</div>
						<div className="flex">
							<TextField
								className="mb-24"
								label="Premium Media Link"
								id="premiumMediaLink"
								name="premiumMediaLink"
								value={form.premiumMediaLink}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
						</div>
					</div>}
					{(type === 'golden') &&
					<div className="golden">
						<div className="flex">
							<TextField
								className="mb-24"
								label="Golden Presentation Link"
								id="goldenPresentationLink"
								name="goldenPresentationLink"
								value={form.goldenPresentationLink}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
						</div>
						<div className="flex">
							<TextField
								className="mb-24"
								label="Media Link"
								id="goldenMediaLink"
								name="goldenMediaLink"
								value={form.goldenMediaLink}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
						</div>
					</div>}
					
				</DialogContent>

				{standDialog.type === 'new' ? (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								onClick={handleSubmit}
								type="submit"
								disabled={!canBeSubmitted()}
							>
								Add
							</Button>
						</div>
					</DialogActions>
				) : (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								type="submit"
								onClick={handleSubmit}
								disabled={!canBeSubmitted()}
							>
								Save
							</Button>
						</div>
						<IconButton onClick={handleRemove}>
							<Icon>delete</Icon>
						</IconButton>
					</DialogActions>
				)}
			</form>
		</Dialog>
	);
}

export default StandDialog;
