import FuseAnimate from '@fuse/core/FuseAnimate';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openLabelsDialog, selectLabels } from './store/labelsSlice';
import { useParams } from 'react-router-dom';
import { getFeedbacks } from './store/feedbackSlice';
import { useEffect, useRef } from 'react';
import StorefrontIcon from '@material-ui/icons/Storefront';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';



const useStyles = makeStyles(theme => ({
	paper: {
		[theme.breakpoints.down('md')]: {
			boxShadow: 'none'
		}
	},
	listItem: {
		color: 'inherit!important',
		textDecoration: 'none!important',
		height: 40,
		width: 'calc(100% - 16px)',
		borderRadius: '0 20px 20px 0',
		paddingLeft: 24,
		paddingRight: 12,
		'&.active': {
			backgroundColor: theme.palette.secondary.main,
			color: `${theme.palette.secondary.contrastText}!important`,
			pointerEvents: 'none',
			'& .list-item-icon': {
				color: 'inherit'
			}
		},
		'& .list-item-icon': {
			marginRight: 16
		}
	}
}));




function FeedbacksSidebarContent(props) {
	const dispatch = useDispatch();
	var labels = useSelector(selectLabels);
	const classes = useStyles(props);
	var routeParams = useParams();



	// //HERE WILL GET ALL NOTES FROM SERVER BASED ON URL CHANGE(on URL labelId)
	// useEffect(() => {
	// 	if (routeParams.labelId != undefined) { dispatch(getNotes(routeParams.labelId)); }
	// }, [routeParams.labelId])

	// //HERE WILL GET DEFAULT LABEL(STAND) BASED ON URL(if URL has no labelId), and it CHANGES with THE CHANGE OF LABELS
	// const history = useHistory();
	// useEffect(() => {
	// 	if (labels.length != 0) {
	// 		var map = labels.map(label => (label.id));
	// 		var [firstValue] = map.values();
	// 		if ((routeParams.labelId == undefined || routeParams.labelId != lastRouteParam) && firstValue != undefined) { history.push(`/apps/feedback/${routeParams.id}/stand/${firstValue}`); }
	// 		var lastRouteParam = routeParams.labelId;
	// 	}

	// 	if (labels.length == 0) {
	// 		history.push(`/apps/feedback/${routeParams.id}/stand/`);
	// 	}
	// }, [labels]);


	return (
		<div className="p-0 lg:p-24 lg:ltr:pr-4 lg:rtl:pl-4">
			<FuseAnimate animation="transition.slideLeftIn" delay={200}>
				<Paper elevation={1} className={clsx(classes.paper, 'rounded-8')}>
					<List>
						<ListItem
							button
							component={NavLinkAdapter}
							to={`/apps/feedback/${routeParams.id}/recent`}
							exact
							activeClassName="active"
							className={classes.listItem}
						>
							<AccessTimeIcon className="list-item-icon text-16" color="action" />
							<ListItemText className="truncate" primary="Recent Feedback" disableTypography />
						</ListItem>
					</List>
					<Divider />
					<List>
						<ListSubheader>ALL STANDS</ListSubheader>

						{_.orderBy(
							labels,
							[
								o => {
									return o['name'];
								}

							],
							['asc']
						)
							.map(label => (
								<ListItem
									key={label.id}
									button
									component={NavLinkAdapter}
									to={`/apps/feedback/${routeParams.id}/stand/${label.id}`}
									exact
									activeClassName="active"
									className={classes.listItem}
								>
									<StorefrontIcon className="list-item-icon text-16" color="action" />


									<ListItemText className="truncate" primary={label.name} disableTypography />
								</ListItem>
							))}
					</List>
					<Divider />
				</Paper>
			</FuseAnimate>
		</div>
	);
}

export default FeedbacksSidebarContent;
