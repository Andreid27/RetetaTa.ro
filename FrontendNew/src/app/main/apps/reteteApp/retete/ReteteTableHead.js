import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import React, { useState } from 'react';

const rows = [
	// {
	// 	id: 'image',
	// 	align: 'left',
	// 	disablePadding: true,
	// 	label: '',
	// 	sort: false
	// },
	{
		id: 'Denumire',
		align: 'left',
		disablePadding: false,
		label: 'Denumire',
		sort: true
	},
	{
		id: 'Descriere',
		align: 'left',
		disablePadding: false,
		label: 'Descriere',
		sort: true
	},
	{
		id: 'Pret',
		align: 'right',
		disablePadding: false,
		label: 'Pret',
		sort: true
	},
	{
		id: 'Calorii',
		align: 'right',
		disablePadding: false,
		label: 'Calorii',
		sort: true
	}
	// {
	// 	id: 'active',
	// 	align: 'right',
	// 	disablePadding: false,
	// 	label: 'Active',
	// 	sort: true
	// }
];

const useStyles = makeStyles(theme => ({
	actionsButtonWrapper: {
		background: theme.palette.background.paper
	}
}));

function ReteteTableHead(props) {
	const classes = useStyles(props);
	const [selectedreteteMenu, setSelectedreteteMenu] = useState(null);

	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
		// console.log(event, property);
	};

	function openSelectedreteteMenu(event) {
		setSelectedreteteMenu(event.currentTarget);
	}

	function closeSelectedreteteMenu() {
		setSelectedreteteMenu(null);
	}

	return (
		<TableHead>
			<TableRow className="h-64">
				<TableCell padding="none" className="w-40 md:w-64 text-center z-99">
					<Checkbox
						indeterminate={props.numSelected > 0 && props.numSelected < props.rowCount}
						checked={props.numSelected === props.rowCount}
						onChange={props.onSelectAllClick}
					/>
					{props.numSelected > 0 && (
						<div
							className={clsx(
								'flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1',
								classes.actionsButtonWrapper
							)}
						>
							<IconButton
								aria-owns={selectedreteteMenu ? 'selectedreteteMenu' : null}
								aria-haspopup="true"
								onClick={openSelectedreteteMenu}
							>
								<Icon>more_horiz</Icon>
							</IconButton>
							<Menu
								id="selectedreteteMenu"
								anchorEl={selectedreteteMenu}
								open={Boolean(selectedreteteMenu)}
								onClose={closeSelectedreteteMenu}
							>
								<MenuList>
									<MenuItem
										onClick={() => {
											closeSelectedreteteMenu();
										}}
									>
										<ListItemIcon className="min-w-40">
											<Icon>delete</Icon>
										</ListItemIcon>
										<ListItemText primary="Remove" />
									</MenuItem>
								</MenuList>
							</Menu>
						</div>
					)}
				</TableCell>
				{rows.map(row => {
					return (
						<TableCell
							className="p-4 md:p-16"
							key={row.id}
							align={row.align}
							padding={row.disablePadding ? 'none' : 'default'}
							sortDirection={props.order.id === row.id ? props.order.direction : false}
						>
							{row.sort && (
								<Tooltip
									title="Sort"
									placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
									enterDelay={300}
								>
									<TableSortLabel
										active={props.order.id === row.id}
										direction={props.order.direction}
										onClick={createSortHandler(row.id)}
									>
										{row.label}
									</TableSortLabel>
								</Tooltip>
							)}
						</TableCell>
					);
				}, this)}
			</TableRow>
		</TableHead>
	);
}

export default ReteteTableHead;
