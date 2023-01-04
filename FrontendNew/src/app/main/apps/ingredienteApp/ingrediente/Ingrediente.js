import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import IngredienteHeader from './IngredienteHeader';
import IngredienteTable from './IngredienteTable';

function Ingrediente() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<IngredienteHeader />}
			content={<IngredienteTable />}
			innerScroll
		/>
	);
}

export default withReducer('ingredienteApp', reducer)(Ingrediente);
