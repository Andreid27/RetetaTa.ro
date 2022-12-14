import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StandMultiSelectMenu from './StandMultiSelectMenu';
import StandTable from './StandTable';
import { openEditStandDialog, toggleStarredStand, selectStands } from './store/standSlice';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

function StandsList(props) {
	const dispatch = useDispatch();
	const stands = useSelector(selectStands);

	const [filteredData, setFilteredData] = useState(null);

	const columns = React.useMemo(
		() => [
			{
				Header: 'Stand Name',
				accessor: 'name',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Owner',
				accessor: 'createdBy',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Created At',
				accessor: 'createdAt',
				sortable: true,
				Cell: ({ row }) => {
					return new Date(row.original.createdAt).toLocaleString().split(',')[0];
				}
			},
			{
				Header: 'Last Modification By',
				accessor: 'lastModifiedBy',
				sortable: true
			},
			{
				Header: 'Last Modification At',
				accessor: 'lastModifiedAt',
				sortable: true,
				Cell: ({ row }) => {
					return new Date(row.original.lastModifiedAt).toLocaleString().split(',')[0];
				}
			}
		],
		[dispatch]
	);

	useEffect(() => {
		if (stands) {
			setFilteredData(stands);
		}
	}, [stands, setFilteredData]);

	if (!filteredData) {
		return null;
	}

	if (filteredData.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					There are no stands!
				</Typography>
			</div>
		);
	}

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<StandTable
				columns={columns}
				data={filteredData}
				onRowClick={(ev, row) => {
					if (row) {
						dispatch(openEditStandDialog(row.original));
					}
				}}
			/>
		</FuseAnimate>
	);
}

export default StandsList;
