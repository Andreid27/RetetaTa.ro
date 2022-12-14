import _ from '@lodash';
import StorefrontIcon from '@material-ui/icons/Storefront';
import IconButton from '@material-ui/core/IconButton';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Grow, Menu, MenuItem } from "@material-ui/core";



function FeedbackFormLabelMenu(props) {

	const labels = useSelector(({ feedbackApp }) => feedbackApp.labels.entities);
	const routeParams = useParams();
	const [anchor, setAnchor] = useState(null);



	const [selected, setSelected] = useState(routeParams.id);

	const openMenu = (event) => {
		setAnchor(event.currentTarget);
	};

	const closeMenu = () => {
		setAnchor(null);
	};
	const history = useHistory();

	const onMenuItemClick = (event, index) => {

		setAnchor(null);
		setSelected(index);
		history.push(`/apps/feedback/${routeParams.id}/stand/${index}`); //export selected stand to URL
	};




	return (
		<div>
			<IconButton className="w-32 h-32 mx-4 p-0" onClick={openMenu}>
				<StorefrontIcon className="list-item-icon text-16" color="action" />
			</IconButton>
			<Menu
				open={Boolean(anchor)}
				anchorEl={anchor}
				onClose={closeMenu}
				keepMounted
				TransitionComponent={Grow}
			>
				{Object.values(labels).map((label) => (
					<MenuItem
						key={label.id}
						onClick={(event) => onMenuItemClick(event, label.id)}
						selected={label.id === selected}
					>
						{label.name}
					</MenuItem>
				))}
			</Menu>

		</div>
	);
}

export default FeedbackFormLabelMenu;
