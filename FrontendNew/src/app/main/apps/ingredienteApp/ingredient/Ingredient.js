import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import { saveIngredient, getIngredient, updateIngredient, newIngredient } from '../store/ingredientSlice';
import reducer from '../store';
import { useTheme } from '@material-ui/core';
import IngredientView from './IngredientView';




function Ingredient(props) {
	const dispatch = useDispatch();
	const ingredient = useSelector(({ ingredienteApp }) => ingredienteApp.ingredient);
	const theme = useTheme();

	const [tabValue, setTabValue] = useState(0);
	const { form, handleChange, setForm } = useForm(null);
	const routeParams = useParams();
	const history = useHistory();


	useDeepCompareEffect(() => {
		function updateIngrediente() {
			const { ingredientId } = routeParams;

			if (ingredientId === 'new') {
				dispatch(newIngredient());
			} else {
				dispatch(getIngredient(routeParams));
			}
		}

		updateIngrediente();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((ingredient && !form) || (ingredient && form && ingredient.id !== form.id)) {
			setForm(ingredient);
		}
	}, [form, ingredient, setForm]);


	const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

	function handleChangeTab(event, value) {
		setTabValue(value);
	}



	function canBeSubmitted() {
		return form.denumire.length > 0 && !_.isEqual(ingredient, form);
	}

	const submitProduct = async event => {
		if (routeParams.ingredientId === 'new') {
			dispatch(saveIngredient(form));
			await delay(1000);
			history.push('/apps/ingredienteApp');
		}
		if (routeParams.productHandle === 'edit') {
			dispatch(updateIngredient(form));
			await delay(1000);
			history.push('/apps/ingredienteApp/ingrediente/' + routeParams.ingredientId);
		}
	};
	// console.log(routeParams);

	if (
		(!ingredient || (ingredient && routeParams.ingredientId !== ingredient.id)) &&
		routeParams.ingredientId !== 'new' &&
		routeParams.productHandle !== 'edit'
	) {
		return <IngredientView reteta={ingredient} />;
	}

	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				form && (
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
										<Typography className="text-16 sm:text-20 truncate">
											{form.denumire ? form.denumire : 'Ingredient nou'}
										</Typography>
									</FuseAnimate>
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography variant="caption">Detalii ingredient</Typography>
									</FuseAnimate>
								</div>
							</div>
						</div>
						<FuseAnimate animation="transition.slideRightIn" delay={300}>
							<Button
								className="whitespace-no-wrap normal-case"
								variant="contained"
								color="secondary"
								disabled={!canBeSubmitted()}
								onClick={() => submitProduct()}
							>
								Salvează ingredient
							</Button>
						</FuseAnimate>
					</div>
				)
			}
			contentToolbar={
				<Tabs
					value={tabValue}
					onChange={handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					classes={{ root: 'w-full h-64' }}
				>
					<Tab className="h-64 normal-case" label="Descriere" />
				</Tabs>
			}
			content={
				form && (
					<div className="p-16 sm:p-24 max-w-2xl">
						{tabValue === 0 && (
							<div>
								<TextField
									className="mt-8 mb-16"
									error={form.denumire === ''}
									required
									label="Denumire"
									autoFocus
									id="denumire"
									name="denumire"
									value={form.denumire}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>

								<TextField
									className="mt-8 mb-16"
									id="descriere"
									name="descriere"
									onChange={handleChange}
									label="Descriere"
									type="text"
									value={form.descriere}
									multiline
									rows={5}
									variant="outlined"
									fullWidth
								/>
							</div>
						)}
					</div>
				)
			}
			innerScroll
		/>
	);
}

export default withReducer('ingredienteApp', reducer)(Ingredient);
