import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useSelector } from 'react-redux';

function Widget2(props) {
	const totalUsers = useSelector(({ homeApp }) => homeApp.total);

	return (
		<Paper className="w-full rounded-8 shadow-1">
			<div className="flex items-center justify-between px-4 pt-4">
				<Typography className="text-16 px-12">Total Users</Typography>
				<IconButton aria-label="more">
					<Icon>more_vert</Icon>
				</IconButton>
			</div>
			<div className="text-center pt-12 pb-28">
				<Typography className="text-72 leading-none text-red">{totalUsers.length}</Typography>
				<Typography className="text-16" color="textSecondary">
					USERS CREATED
				</Typography>
			</div>
			{/* <div className="flex items-center px-16 h-52 border-t-1">
				<Typography className="text-15 flex w-full" color="textSecondary">
					<span className="truncate">123456</span>:<b className="px-8">1234567</b>
				</Typography>
			</div> */}
		</Paper>
	);
}

export default React.memo(Widget2);
