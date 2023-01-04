import React from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import {
	Box,
	Button,
	Icon,
	Typography,
	useTheme
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { deleteIngredient } from '../store/ingredientSlice';

const IngredientView = () => {
	const theme = useTheme();
	const routeParams = useParams();
	const ingredient = useSelector(({ ingredienteApp }) => ingredienteApp.ingredient);
	const user = useSelector(({ auth }) => auth.user.data);
	const dispatch = useDispatch();
	const history = useHistory();
	const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

	const deleteThisReteta = async event => {
		dispatch(deleteIngredient(routeParams));
		await delay(1000);
		history.push('/apps/ingredienteApp');
	};

	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				ingredient && (
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex flex-col items-start max-w-full">
							<FuseAnimate animation="transition.slideRightIn" delay={300}>
								<Typography
									className="normal-case flex items-center sm:mb-12"
									component={Link}
									role="button"
									to="/apps/ingredienteApp"
									color="inherit"
								>
									<Icon className="text-20">
										{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
									</Icon>
									<span className="mx-4">Ingrediente</span>
								</Typography>
							</FuseAnimate>

							<div className="flex items-center max-w-full">
								<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography className="text-16 sm:text-20 truncate"></Typography>
									</FuseAnimate>
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography variant="caption">Detalii rețetă {ingredient.denumire}</Typography>
									</FuseAnimate>
								</div>
							</div>
						</div>
						{(ingredient.autor && ingredient.autor.username === user.displayName) && (
							<FuseAnimate animation="transition.slideRightIn" delay={300}>
								<div>
									<Button
										className="whitespace-no-wrap normal-case"
										variant="contained"
										color="secondary"
										onClick={() =>
											history.push('/apps/ingredienteApp/ingrediente/' + routeParams.ingredientId + '/edit')
										}
									>
										Editare
									</Button>
									<Button
										className="whitespace-no-wrap normal-case"
										color="secondary"
										onClick={() => deleteThisReteta()}
									>
										<DeleteIcon />
									</Button>
								</div>
							</FuseAnimate>
						)}
					</div>
				)
			}
			content={
				ingredient && (
					<div className="p-16 sm:p-24 max-w-2xl">
						<div>
							<Box margin={2}>
								<Typography variant="h3" align="left">
									{ingredient.denumire}
								</Typography>
							</Box>
							<Box margin={1}>
								<Typography variant="h5">Descriere</Typography>
								<Typography variant="body1" style={{ marginTop: 10, marginBottom: 5 }}>
									{ingredient.descriere}{' '}
								</Typography>
							</Box>
						</div>
					</div>
				)
			}
			innerScroll
		/>
	);
};

export default IngredientView;
