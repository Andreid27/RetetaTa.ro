import Widget1 from './Widgets/Widget1';
import Widget2 from './Widgets/Widget2';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import { useDeepCompareEffect } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import reducer from './store';
import { getEvents, selectEvents } from './store/homeSlice';
import { getDailyUsers } from './store/dailyUsersSlice';
import { getWeeklyUsers } from './store/weeklyUsersSlice';
import { getMonthlyUsers } from './store/monthlyUsersSlice';
import { getYearlyUsers } from './store/yearlyUsersSlice';
import { getTotalUsers } from './store/totalUserSlice';

const useStyles = makeStyles(theme => ({
	header: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
		color: theme.palette.getContrastText(theme.palette.primary.main)
	},
	headerIcon: {
		position: 'absolute',
		top: -64,
		left: 0,
		opacity: 0.04,
		fontSize: 512,
		width: 512,
		height: 512,
		pointerEvents: 'none'
	}
}));

function Home(props) {
	const dispatch = useDispatch();
	const events = useSelector(selectEvents);

	const classes = useStyles(props);
	const theme = useTheme();
	const [filteredData, setFilteredData] = useState(null);
	const [searchText, setSearchText] = useState('');

	useDeepCompareEffect(() => {
		dispatch(getDailyUsers());
		dispatch(getWeeklyUsers());
		dispatch(getMonthlyUsers());
		dispatch(getYearlyUsers());
		dispatch(getTotalUsers());
		dispatch(getEvents());
	}, [dispatch]);

	useEffect(() => {
		function getFilteredArray() {
			if (searchText.length === 0) {
				return events;
			}

			return _.filter(events, item => {
				return item.name.toLowerCase().includes(searchText.toLowerCase());
			});
		}

		if (events) {
			setFilteredData(getFilteredArray());
		}
	}, [events, searchText]);

	function handleSearchText(event) {
		setSearchText(event.target.value);
	}

	return (
		<div className="flex flex-col flex-auto flex-shrink-0 w-full">
			<div
				className={clsx(
					classes.header,
					'relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-288'
				)}
			>
				<FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
					<Typography color="inherit" className="text-24 sm:text-40 font-light">
						WELCOME TO vGallery
					</Typography>
				</FuseAnimate>
				<Icon className={classes.headerIcon}> school </Icon>
			</div>
			<div className="flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24">
				<div className="flex flex-col flex-shrink-0 sm:flex-row items-center justify-between py-24">
					<TextField
						label="Search for a event"
						placeholder="Enter a keyword..."
						className="flex w-full sm:w-320 mb-16 sm:mb-0 mx-16"
						value={searchText}
						inputProps={{
							'aria-label': 'Search'
						}}
						onChange={handleSearchText}
						variant="outlined"
						InputLabelProps={{
							shrink: true
						}}
					/>
				</div>
				<FuseAnimateGroup
					className="flex flex-wrap"
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
					<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
						<Widget2 />
					</div>
					<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
						<Widget1 />
					</div>
				</FuseAnimateGroup>
				{useMemo(
					() =>
						filteredData &&
						(filteredData.length > 0 ? (
							<FuseAnimateGroup
								enter={{
									animation: 'transition.slideUpBigIn'
								}}
								className="flex flex-wrap py-24"
							>
								{filteredData.map(event => {
									const startDate = new Date(event.startDate).toLocaleString().split(',')[0];
									const endDate = new Date(event.endDate).toLocaleString().split(',')[0];

									return (
										<div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" key={event.id}>
											<Card elevation={1} className="flex flex-col h-256 rounded-8">
												<div
													className="flex flex-shrink-0 items-center justify-between px-24 h-64"
													style={{
														background: '#61DAFB',
														color: '#000000de'
													}}
												>
													<div className="flex items-center justify-center opacity-75">
														<Icon className="text-20 mx-8" color="red">
															access_time
														</Icon>
														<Typography className="font-medium truncate" color="inherit">
															{startDate}
														</Typography>
													</div>
													<div className="flex items-center justify-center opacity-75">
														<Icon className="text-20 mx-8" color="red">
															access_time
														</Icon>
														<Typography className="font-medium truncate" color="inherit">
															{endDate}
														</Typography>
													</div>
												</div>
												<CardContent className="flex flex-col flex-auto items-center justify-center">
													<Typography className="text-center text-16 font-800">
														{event.name}
													</Typography>
													<Typography
														className="text-center text-13 font-600 mt-4"
														color="textSecondary"
													>
														{event.description}
													</Typography>
												</CardContent>
												<Divider />
												<CardActions className="justify-center">
													<Button
														to={`/apps/event-app/${event.id}`}
														component={Link}
														className="justify-start px-32"
														color="secondary"
													>
														SEE EVENT
													</Button>
												</CardActions>
											</Card>
										</div>
									);
								})}
							</FuseAnimateGroup>
						) : (
							<div className="flex flex-1 items-center justify-center">
								<Typography color="textSecondary" className="text-24 my-24">
									No events found!
								</Typography>
							</div>
						)),
					[filteredData, theme.palette]
				)}
			</div>
		</div>
	);
}

export default withReducer('homeApp', reducer)(Home);
