import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import ReteteHeader from './ReteteHeader';
import ReteteTable from './ReteteTable';

function Retete() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<ReteteHeader />}
			content={<ReteteTable />}
			innerScroll
		/>
	);
}

export default withReducer('eCommerceApp', reducer)(Retete);
