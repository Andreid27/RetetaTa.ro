import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDailyUsers } from '../store/dailyUsersSlice';
import { useDeepCompareEffect } from '@fuse/hooks';
import { MenuItem, TextField } from '@material-ui/core';

const ranges = [
	{
		value: 'daily',
		label: 'daily'
	},
	{
		value: 'weekly',
		label: 'weekly'
	},
	{
		value: 'monthly',
		label: 'monthly'
	},
	{
		value: 'yearly',
		label: 'yearly'
	}
];

function Widget1(props) {
	const [currentRange, setCurrentRange] = useState('daily');
	const dispatch = useDispatch();

	const dailyUsers = useSelector(({ homeApp }) => homeApp.daily);
	const weeklyUsers = useSelector(({ homeApp }) => homeApp.weekly);
	const monthlyUsers = useSelector(({ homeApp }) => homeApp.monthly);
	const yearlyUsers = useSelector(({ homeApp }) => homeApp.yearly);

	let period = '';

	switch (currentRange) {
		case 'daily':
			period = 'daily';
			break;
		case 'weekly':
			period = 'weekly';
			break;
		case 'monthly':
			period = 'monthly';
			break;
		case 'yearly':
			period = 'yearly';
			break;
		default:
			break;
	}

	const data = {
		daily: dailyUsers,
		weekly: weeklyUsers,
		monthly: monthlyUsers,
		yearly: yearlyUsers
	};

	function handleChangeRange(ev) {
		setCurrentRange(ev.target.value);
	}

	useDeepCompareEffect(() => {
		dispatch(getDailyUsers(period));
	}, [dispatch, period]);

	return (
		<Paper className="w-full rounded-8 shadow-1">
			<div className="flex items-center justify-between px-4 pt-4">
				<TextField
					className="px-12"
					id="Range"
					name="range"
					value={currentRange}
					onChange={handleChangeRange}
					variant="outlined"
					required
					fullWidth
					select
				>
					{ranges.map(option => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
				<IconButton aria-label="more">
					<Icon>more_vert</Icon>
				</IconButton>
			</div>
			<div className="text-center pt-12 pb-28">
				<Typography className="text-72 leading-none text-blue">{data[currentRange].length}</Typography>
				<Typography className="text-16" color="textSecondary">
					USERS LOGGED
				</Typography>
			</div>
			{/* <div className="flex items-center px-16 h-52 border-t-1">
				<Typography className="text-15 flex w-full" color="textSecondary">
					
				</Typography>
			</div> */}
		</Paper>
	);
}

export default React.memo(Widget1);
