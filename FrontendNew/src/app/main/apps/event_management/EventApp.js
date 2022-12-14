import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import EventDialog from './EventDialog';
import EventHeader from './EventHeader';
import EventList from './EventList';
import EventSidebarContent from './EventSidebarContent';
import reducer from './store';
import { getEvents } from './store/eventSlice';

function EventApp(props) {
	const dispatch = useDispatch();

	const pageLayout = useRef(null);

	useDeepCompareEffect(() => {
		dispatch(getEvents());
	}, [dispatch]);

	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 sm:p-24 h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					wrapper: 'min-h-0'
				}}
				header={<EventHeader pageLayout={pageLayout} />}
				content={<EventList />}
				leftSidebarContent={<EventSidebarContent />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			<EventDialog />
		</>
	);
}

export default withReducer('eventApp', reducer)(EventApp);
