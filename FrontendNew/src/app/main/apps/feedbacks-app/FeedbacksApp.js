import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import LabelsDialog from './dialogs/labels/LabelsDialog';
import FeedbackDialog from './dialogs/feedback/FeedbackDialog';
import NewFeedback from './NewFeedback';
import FeedbackList from './FeedbackList';
import FeedbacksHeader from './FeedbacksHeader';
import FeedbacksSidebarContent from './FeedbacksSidebarContent';
import reducer from './store';
import { getLabels } from './store/labelsSlice';
import { useParams } from 'react-router-dom';
import { getFeedbacks, getRecentFeedbacks } from './store/feedbackSlice';
import { useDeepCompareEffect } from '@fuse/hooks';
import FeedbackTable from './FeedbackRecent/FeedbackTable';


function FeedbacksApp(props) {
	const dispatch = useDispatch();



	const pageLayout = useRef(null);
	const routeParams = useParams();
	useDeepCompareEffect(() => {
		if (routeParams.labelHandle == "recent") {
			dispatch(getRecentFeedbacks(routeParams.id));
		}
		else {
			dispatch(getFeedbacks(routeParams.labelId));
		}
	}, [dispatch, routeParams]);

	useEffect(() => {
		dispatch(getLabels(routeParams.id));
	}, [dispatch, routeParams.id])


	return routeParams.labelHandle != "recent" ? (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'p-16 sm:p-24 pb-80',
					content: 'flex min-h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72'
				}}
				header={<FeedbacksHeader pageLayout={pageLayout} />}
				content={
					<div className="flex flex-col w-full items-center">
						<NewFeedback />
						<FeedbackList />
						<FeedbackDialog />
						<LabelsDialog />
					</div>
				}
				leftSidebarContent={<FeedbacksSidebarContent />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
		</>
	) : (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'p-16 sm:p-24 pb-80',
					content: 'flex min-h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72'
				}}
				header={<FeedbacksHeader pageLayout={pageLayout} />}
				content={
					<div className="flex flex-col w-full items-center">
						<FeedbackTable />
						<FeedbackDialog />
						<LabelsDialog />
					</div>
				}
				leftSidebarContent={<FeedbacksSidebarContent />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
		</>
	);
}

export default withReducer('feedbackApp', reducer)(FeedbacksApp);
