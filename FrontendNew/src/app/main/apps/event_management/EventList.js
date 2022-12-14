import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventMultiSelectMenu from './EventMultiSelectMenu';
import EventTable from './EventTable';
import { openEditEventDialog, removeEvent, toggleStarredEvent, selectEvents } from './store/eventSlice';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

function EventsList(props) {
	const dispatch = useDispatch();
	const events = useSelector(selectEvents);

	const [filteredData, setFilteredData] = useState(null);


	const columns = React.useMemo(
		() => [
			{
				Header: 'View Event',
				accessor: 'id',
				className: 'font-bold',
				sortable: true,
				Cell: ({ row }) => {
					return (
						<Button
							to={`/apps/event-app/${row.original.id}`}
							component={Link}
							className="justify-start px-32"
							color="secondary"
						>
							SEE EVENT
						</Button>
					);
				}
			},
			{
				Header: 'View Stands',
				//accessor: 'id',
				className: 'font-bold',
				sortable: true,
				Cell: ({ row }) => {
					return (
						<Button
							to={`/apps/stand_management/${row.original.id}`}
							component={Link}
							className="justify-start px-32"
							color="secondary"
						>
							SEE STANDS
						</Button>
					);
				}
			},
			{
				Header: 'View Discussions',
				//accessor: 'id',
				className: 'font-bold',
				sortable: true,
				Cell: ({ row }) => {
					return (
						<Button
							to={`/apps/feedback/${row.original.id}/recent`}
							component={Link}
							className="justify-start px-32"
							color="secondary"
						>
							SEE DISCUSSIONS
						</Button>
					);
				}
			},
			{
				Header: 'Event Name',
				accessor: 'name',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Start Date',
				accessor: 'startDate',
				className: 'font-bold',
				sortable: true,
				Cell: ({ row }) => {
					return new Date(row.original.startDate).toLocaleString().split(',')[0];
				}
			},
			{
				Header: 'End Date',
				accessor: 'endDate',
				sortable: true,
				Cell: ({ row }) => {
					return new Date(row.original.endDate).toLocaleString().split(',')[0];
				}
			},
			{
				Header: 'Description',
				accessor: 'description',
				sortable: true
			},
			{
				Header: 'Owner',
				accessor: 'username',
				sortable: true
			}
		],
		[dispatch]
	);

	useEffect(() => {
		if (events) {
			setFilteredData(events);
		}
	}, [events]);

	if (!filteredData) {
		return null;
	}

	if (filteredData.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					There are no events!
				</Typography>
			</div>
		);
	}

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<EventTable
				columns={columns}
				data={filteredData}
				onRowClick={(ev, row) => {
					if (row) {
						dispatch(openEditEventDialog(row.original));
					}
				}}
			/>
		</FuseAnimate>
	);
}

export default EventsList;
