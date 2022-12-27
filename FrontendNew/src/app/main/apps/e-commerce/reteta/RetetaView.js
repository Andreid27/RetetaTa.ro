import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Box, Button, Collapse, Icon, IconButton, makeStyles, TableBody, TableCell, TableRow, TextField, Typography, useTheme } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Column, Table } from 'react-virtualized';
import { selectProductById } from '../store/productsSlice';
import IngredienteInfoTabel from './IngredienteInfoTable';



const RetetaView = () => {
  const theme = useTheme();
  const routeParams = useParams();
	const reteta = useSelector(({ eCommerceApp }) => eCommerceApp.product);
	const user = useSelector(({ auth }) => auth.user.data);





	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
        reteta && (
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex flex-col items-start max-w-full">
							<FuseAnimate animation="transition.slideRightIn" delay={300}>
								<Typography
									className="normal-case flex items-center sm:mb-12"
									component={Link}
									role="button"
									to="/apps/e-commerce/retete"
									color="inherit"
								>
									<Icon className="text-20">
										{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
									</Icon>
									<span className="mx-4">Rețete</span>
								</Typography>
							</FuseAnimate>

							<div className="flex items-center max-w-full">
								<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography className="text-16 sm:text-20 truncate">
											
										</Typography>
									</FuseAnimate>
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography variant="caption">Detalii rețetă {reteta.denumire}</Typography>
									</FuseAnimate>
								</div>
							</div>
						</div>
            {reteta.autor.username === user.displayName &&(
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
							<Button
								className="whitespace-no-wrap normal-case"
								variant="contained"
								color="secondary"
								// disabled={!canBeSubmitted()}
								// onClick={() => submitProduct()}
							>
								Edit
							</Button>
						</FuseAnimate>)}
					</div>)
			}
      
			content={
        reteta && (
					<div className="p-16 sm:p-24 max-w-2xl">
							<div>
              <Box margin={2}>
                <Typography variant="h3" align='center'>{reteta.denumire}</Typography>
              </Box>
              <Box margin={1}>
                <Typography variant="h5">Descriere</Typography>
                <Typography variant="body1" style={{marginTop:10 , marginBottom:5}}>{reteta.descriere} </Typography>
              </Box>

              <IngredienteInfoTabel ingrediente={reteta.ingredientCantitate}/>

							</div>
					</div>
  )}
			innerScroll
		/>
	);
}

export default RetetaView;