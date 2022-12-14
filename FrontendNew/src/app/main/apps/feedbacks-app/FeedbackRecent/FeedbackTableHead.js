import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button, ClickAwayListener, Divider, Grid, List, Popover, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { setFeedbacksFilterDate, setFeedbacksFilterStars } from '../store/feedbackSlice';
import { KeyboardDatePicker } from '@material-ui/pickers';
import FeedbackFilterResetButton from './FeedbackFilterResetButton';

const rows = [
	{
		id: 'Time Desc',
		categorie: 'timestamp',
		label: 'Last Feedback',
		sort: true,
		direction: 'desc'
	},
	{
		id: 'Time asc',
		categorie: 'timestamp',
		label: 'First Feedback',
		sort: true,
		direction: 'asc'
	},
	{
		id: 'rating asc',
		categorie: 'rating',
		label: 'Rating Ascending',
		sort: true,
		direction: 'asc'
	},
	{
		id: 'rating desc',
		categorie: 'rating',
		label: 'Rating Descending',
		sort: true,
		direction: 'desc'
	}
];

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	},
	divcontrol: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center"
	},
	barcontent: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		maxWidth: "90%"
	},
	label: {
		display: "flex"
	},
	actionsButtonWrapper: {
		background: theme.palette.background.paper
	},
	dateContainer: {
		display: 'flex',
		flexWrap: 'wrap',
	}
}));




function FeedbackTableHead(props) {

	const [selectedProductsMenu, setSelectedProductsMenu] = useState(null);

	//"SORT BY" FUNCTIONS:
	const classes = useStyles();
	const [sortCategory, setSortCategory] = React.useState('Time Desc');
	const createSortHandler = property => event => {
		setSortCategory(event.target.value);
		let categorie = 'timestamp';
		let direction = 'desc'
		for (let i = 0; i < rows.length; i++) {
			if (rows[i].id === event.target.value) {
				categorie = rows[i].categorie;
				direction = rows[i].direction;
			}
		}
		property = event.target.value;
		props.onRequestSort(event, categorie, direction);
	};


	function openSelectedProductsMenu(event) {
		setSelectedProductsMenu(event.currentTarget);
	}

	function closeSelectedProductsMenu() {
		setSelectedProductsMenu(null);
	}



	//POPOVER FUNCTIONS:
	const labels = useSelector(({ feedbackApp }) => feedbackApp.labels.entities);

	const [anchorEl, setAnchorEl] = useState(null);

	function handleMenuClick(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleMenuClose() {
		setAnchorEl(null);
	}

	function handleToggleLabel(id) {
		props.onChange(_.xor(props.note.labels, [id]));
	}
	//FILTER STARS FUNCTIONS
	const dispatch = useDispatch();
	const filterStars = useSelector(({ feedbackApp }) => feedbackApp.feedbacks.filterStars);
	const [value, setValue] = React.useState(2);
	function StarsChange(event, newValue) {
		setValue(newValue);
		dispatch(setFeedbacksFilterStars(event))
	}

	//DATE FILTER FUNCTIONS
	const [fromDate, setFromDate] = React.useState(new Date());
	const [untilDate, setUntilDate] = React.useState(new Date());
	const handleFromDateChange = (date) => {
		setFromDate(date);
		DateChange(date, untilDate);

	};
	const handleUntilDateChange = (date) => {
		setUntilDate(date);
		DateChange(fromDate, date);
	};

	function DateChange(from, until) {
		var dates = JSON.stringify({ from, until })
		dispatch(setFeedbacksFilterDate(dates));
	}





	return (
		<TableHead>
			<TableRow className="h-64">
				<div className={classes.barcontent}>
					<div className={classes.divcontrol}>
						<InputLabel className={classes.label} id="demo-simple-select-label">
							Sort by:
						</InputLabel>
						<FormControl className={classes.formControl}>
							<Select
								defaultValue={30}
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={sortCategory}
								onChange={createSortHandler()}
							>
								{rows.map((row) => (
									<MenuItem key={row.id + ' ' + row.direction} value={row.id}>
										{row.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>

					<div>
						<Button className="w-32 h-32 mx-4 p-0" variant="outlined" onClick={handleMenuClick}>
							Filter</Button>
						<Popover
							hideBackdrop
							open={Boolean(anchorEl)}
							anchorEl={anchorEl}
							onClose={handleMenuClose}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'center'
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'center'
							}}
							className="pointer-events-none"
							classes={{
								paper: 'pointer-events-auto px-2 py-10 prevent-add-close'
							}}
						>
							<ClickAwayListener onClickAway={handleMenuClose}>
								<List className="p-12">
									< Typography component="h6" > Filter by rating:</Typography >
									< Typography className="text-11" color="textSecondary" > Show reviews only with: {filterStars}</Typography >
									<Rating
										value={value}
										max={10}
										defaultValue={2}
										name="customized-10"
										onChange={(ev, newValue) => StarsChange(ev, newValue)}
										onClick={props.handleInputChange}
									/>
									<Divider className='my-10' />
									< Typography component="h6" > Filter by date and time:</Typography >
									< Typography className="text-11" color="textSecondary" > Show reviews written:</Typography >
									<Grid container justifycontent="space-around">
										<KeyboardDatePicker
											variant="inline"
											margin="normal"
											id="date-picker-dialog"
											label="From"
											format="DD/MM/yyyy"
											value={fromDate}
											onChange={handleFromDateChange}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
										/>
										<KeyboardDatePicker
											variant="inline"
											margin="normal"
											id="date-picker-dialog"
											label="Until"
											format="DD/MM/yyyy"
											value={untilDate}
											onChange={handleUntilDateChange}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
										/>
									</Grid>
									<FeedbackFilterResetButton />
								</List>
							</ClickAwayListener>
						</Popover>
					</div>
				</div>
			</TableRow>
		</TableHead>
	);
}

export default FeedbackTableHead;
