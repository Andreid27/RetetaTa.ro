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
import { saveProduct, newProduct, getProduct, updateProduct } from '../store/retetaSlice';
import reducer from '../store';
import RetetaView from './RetetaView';
import { useTheme } from '@material-ui/core';
import IngredeinteFields from './IngredeinteFields';


let priceRangeValues = [
	{
		value: 1,
		label: '$'
	},
	{
		value: 2,
		label: '$$'
	},
	{
		value: 3,
		label: '$$$'
	},
	{
		value: 4,
		label: '$$$$'
	},
	{
		value: 5,
		label: '$$$$$'
	}
];



function Reteta(props) {
	const dispatch = useDispatch();
	const product = useSelector(({ eCommerceApp }) => eCommerceApp.product);
	const theme = useTheme();

	const [formIngrediente, setFormIngrediente] = useState('');
	const [tabValue, setTabValue] = useState(0);
	const { form, handleChange, setForm } = useForm(null);
	const routeParams = useParams();
	const history = useHistory();

	useDeepCompareEffect(() => {
		function updateretetetate() {
			const { productId } = routeParams;

			if (productId === 'new') {
				dispatch(newProduct());
			} else {
				dispatch(getProduct(routeParams));
			}
		}

		updateretetetate();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((product && !form) || (product && form && product.id !== form.id)) {
			setForm(product);
		}
	}, [form, product, setForm]);

	// useEffect(() => {
	// 	if ((product && !form) && routeParams.productHandle == 'edit') {
	// 		let numarIngrediente = product.ingredientCantitate.length
	// 		setForm(_.set({ ...form }, 'ingredienteNumber', numarIngrediente));
	// 	}
	// }, []); DE CONTINUAT DACA ESTE NEVOIE SA TINA MINTE INGREDIENTELE

	const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	function handleChipChange(value, name) {
		// console.log(value, name);
		setForm(_.set({ ...form }, name, value.value));
	}



	function canBeSubmitted() {
		return form.denumire.length > 0 && !_.isEqual(product, form);
	}

	const submitProduct = async event => {
		if (routeParams.productId === 'new') {
			dispatch(saveProduct(formIngrediente));
			await delay(1000);
			history.push('/apps/reteteApp/retete');
		}
		if (routeParams.productHandle === 'edit') {
			dispatch(updateProduct(formIngrediente));
			await delay(1000);
			history.push('/apps/reteteApp/retete/' + routeParams.productId);
		}
	};
	// console.log(routeParams);

	if (
		(!product || (product && routeParams.productId !== product.id)) &&
		routeParams.productId !== 'new' &&
		routeParams.productHandle !== 'edit'
	) {
		return <RetetaView reteta={product} />;
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
									to="/apps/reteteApp/retete"
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
											{form.denumire ? form.denumire : 'Rețetă nouă'}
										</Typography>
									</FuseAnimate>
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography variant="caption">Detalii rețetă</Typography>
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
								Salvează rețeta
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
					<Tab className="h-64 normal-case" label="Ingrediente" />
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

								<FuseChipSelect
									className="mt-8 mb-24"
									value={priceRangeValues.find(item => item.value === form.priceRange)}
									options={priceRangeValues}
									onChange={value => {
										console.log(value);
										handleChipChange(value, 'priceRange');
									}}
									placeholder="Selectați zona de preț"
									textFieldProps={{
										label: 'Pret',
										InputLabelProps: {
											shrink: true
										},
										variant: 'outlined'
									}}
								/>
								<TextField
									className="mt-8 mb-16"
									id="calorii"
									name="calorii"
									label="Calorii"
									value={form.calorii}
									onChange={handleChange}
									type="number"
									variant="outlined"
									autoFocus
									fullWidth
								/>
							</div>
						)}
						{tabValue === 1 && (
							<div>
								<TextField
									className="mt-8 mb-16"
									label="Număr ingrediente"
									id="ingredienteNumber"
									name="ingredienteNumber"
									value={form.ingredienteNumber}
									onChange={handleChange}
									type="number"
									variant="outlined"
									autoFocus
									fullWidth
								/>
								<IngredeinteFields
									numar={5}
									form={form}
									numarIngrediente={form.ingredienteNumber}
									handleForm={setFormIngrediente}
								></IngredeinteFields>
								{/* de facut pentru fiecare ingredient - cantitate.... */}
							</div>
						)}
					</div>
				)
			}
			innerScroll
		/>
	);
}

export default withReducer('eCommerceApp', reducer)(Reteta);
