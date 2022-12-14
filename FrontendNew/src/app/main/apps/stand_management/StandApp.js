import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import StandDialog from './StandDialog';
import StandHeader from './StandHeader';
import StandList from './StandList';
import StandSidebarContent from './StandSidebarContent';
import reducer from './store';
import { getStandsByEventId } from './store/standSlice';

function StandApp(props) {
	const dispatch = useDispatch();

	const pageLayout = useRef(null);
	const routeParams = useParams();
	useDeepCompareEffect(() => {
		dispatch(getStandsByEventId(routeParams.id));
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
				header={<StandHeader pageLayout={pageLayout} />}
				content={<StandList />}
				leftSidebarContent={<StandSidebarContent />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			<StandDialog />
		</>
	);
}

export default withReducer('standApp', reducer)(StandApp);
