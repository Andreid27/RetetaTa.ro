import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setEventsUnstarred, setEventsStarred, removeEvents } from './store/eventSlice';

function EventsMultiSelectMenu(props) {
	const dispatch = useDispatch();
	const { selectedEventIds } = props;

	const [anchorEl, setAnchorEl] = useState(null);

	function openSelectedEventMenu(event) {
		setAnchorEl(event.currentTarget);
	}

	function closeSelectedEventsMenu() {
		setAnchorEl(null);
	}

	return (
		<>
			<IconButton
				className="p-0"
				aria-owns={anchorEl ? 'selectedEventsMenu' : null}
				aria-haspopup="true"
				onClick={openSelectedEventMenu}
			>
				<Icon>more_horiz</Icon>
			</IconButton>
			<Menu
				id="selectedEventsMenu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={closeSelectedEventsMenu}
			>
				<MenuList>
					<MenuItem
						onClick={() => {
							dispatch(removeEvents(selectedEventIds));
							closeSelectedEventsMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>delete</Icon>
						</ListItemIcon>
						<ListItemText primary="Remove" />
					</MenuItem>
					<MenuItem
						onClick={() => {
							dispatch(setEventsStarred(selectedEventIds));
							closeSelectedEventsMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>star</Icon>
						</ListItemIcon>
						<ListItemText primary="Starred" />
					</MenuItem>
					<MenuItem
						onClick={() => {
							dispatch(setEventsUnstarred(selectedEventIds));
							closeSelectedEventsMenu();
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

export default EventsMultiSelectMenu;
