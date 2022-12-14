import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setStandsUnstarred, setStandsStarred } from './store/standSlice';

function StandsMultiSelectMenu(props) {
	const dispatch = useDispatch();
	const { selectedStandIds } = props;

	const [anchorEl, setAnchorEl] = useState(null);

	function openSelectedStandMenu(stand) {
		setAnchorEl(stand.currentTarget);
	}

	function closeSelectedStandsMenu() {
		setAnchorEl(null);
	}

	return (
		<>
			<IconButton
				className="p-0"
				aria-owns={anchorEl ? 'selectedStandsMenu' : null}
				aria-haspopup="true"
				onClick={openSelectedStandMenu}
			>
				<Icon>more_horiz</Icon>
			</IconButton>
			<Menu
				id="selectedStandsMenu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={closeSelectedStandsMenu}
			>
				<MenuList>
					<MenuItem
						onClick={() => {
							closeSelectedStandsMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>delete</Icon>
						</ListItemIcon>
						<ListItemText primary="Remove" />
					</MenuItem>
					<MenuItem
						onClick={() => {
							dispatch(setStandsStarred(selectedStandIds));
							closeSelectedStandsMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>star</Icon>
						</ListItemIcon>
						<ListItemText primary="Starred" />
					</MenuItem>
					<MenuItem
						onClick={() => {
							dispatch(setStandsUnstarred(selectedStandIds));
							closeSelectedStandsMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>star_border</Icon>
						</ListItemIcon>
						<ListItemText primary="Unstarred" />
					</MenuItem>
				</MenuList>
			</Menu>
		</>
	);
}

export default StandsMultiSelectMenu;
