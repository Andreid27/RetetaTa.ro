import React from 'react';
import Unity, { UnityContext } from 'react-unity-webgl';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import { getEventById } from './store/eventSlice';

const unityContext = new UnityContext({
	loaderUrl: '/build/Build/build.loader.js',
	dataUrl: '/build/Build/build.data',
	frameworkUrl: '/build/Build/build.framework.js',
	codeUrl: '/build/Build/build.wasm'
});

function Event(props) {
	function renderRooms(numberOfStands) {
		const parameters = numberOfStands;
		unityContext.send('Event_Placehold', 'createStands', parameters);
	}

	const dispatch = useDispatch();
	const routeParams = useParams();
	const event = useSelector(({ eventUnity }) => eventUnity.event);
	const numberOfStands = event.numberOfStands;

	useEffect(() => {
		renderRooms(numberOfStands);
	}, [numberOfStands, renderRooms]);

	return (
		<div>
			<Unity
				tabIndex={2}
				unityContext={unityContext}
				style={{
					height: 400,
					width: 1000
				}}
			/>
		</div>
	);
}

export default Event;
