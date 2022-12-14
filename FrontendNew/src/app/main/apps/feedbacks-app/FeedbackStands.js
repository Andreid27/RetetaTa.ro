import Chip from '@material-ui/core/Chip';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectLabelsEntities } from './store/labelsSlice';
import StarIcon from '@material-ui/icons/Star';

function FeedbackStands(props) {

	const label = props.id;

	const linkProps = props.linkable
		? {
			component: Link,
			onClick: ev => {
				ev.stopPropagation();
				//				console.log(label.id);
			},
			to: `/apps/feedback/labels/${label.handle}/${label.id}`,
		}
		: {};




	return (
		<Chip
			label={props.id}
			classes={{
				root: clsx('h-24', props),
				label: 'px-12 py-4 text-11',
				deleteIcon: 'w-16',
				...props.classes
			}}
			variant="outlined"
			onDelete={props.onDelete}
		/>
	);

}

export default FeedbackStands;
