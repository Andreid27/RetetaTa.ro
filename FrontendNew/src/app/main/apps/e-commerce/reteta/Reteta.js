import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { saveProduct, newProduct, getProduct } from '../store/productSlice';
import reducer from '../store';
import Ingrediente from './IngredeinteFields';
import IngredeinteFields from './IngredeinteFields';

const useStyles = makeStyles(theme => ({
	productImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},
	productImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	productImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $productImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $productImageFeaturedStar': {
				opacity: 1
			},
			'&:hover $productImageFeaturedStar': {
				opacity: 1
			}
		}
	}
}));


let priceRangeValues = [
	{
	value:1, 
	label:"$"
	},
	{
	value:2, 
	label:"$$"
	},
	{
	value:3, 
	label:"$$$"
	},
	{
	value:4, 
	label:"$$$$"
	},
	{
	value:5, 
	label:"$$$$$"
	}

]

const priceMap = new Map([
	['1', '$'],
	['2', '$$'],
	['3', '$$$'],
	['4', '$$$$'],
	['5', '$$$$$']
  ])

  const arr = Array.from(priceMap)

function Reteta(props) {
	const dispatch = useDispatch();
	const product = useSelector(({ eCommerceApp }) => eCommerceApp.product);
	const theme = useTheme();

	const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);
	const { form, handleChange, setForm } = useForm(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		function updateProductState() {
			const { productId } = routeParams;

			if (productId === 'new') {
				dispatch(newProduct());
			} else {
				dispatch(getProduct(routeParams));
			}
		}

		updateProductState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((product && !form) || (product && form && product.id !== form.id)) {
			setForm(product);
		}
	}, [form, product, setForm]);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	function handleChipChange(value, name) {
		console.log(value, name)
		setForm(
			_.set(
				{ ...form },
				name,
				value.value
			)
		);
	}

	

	function setFeaturedImage(id) {
		setForm(_.set({ ...form }, 'featuredImageId', id));
	}

	function handleUploadChange(e) {
		const file = e.target.files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.readAsBinaryString(file);

		reader.onload = () => {
			setForm(
				// _.set({ ...form }, `images`, [
				// 	{
				// 		id: FuseUtils.generateGUID(),
				// 		url: `data:${file.type};base64,${btoa(reader.result)}`,
				// 		type: 'image'
				// 	},
				// 	...form.images
				// ])
			);
		};

		reader.onerror = () => {
			console.log('error on load image');
		};
	}

	function canBeSubmitted() {
		return form.denumire.length > 0 && !_.isEqual(product, form);
	}

	if ((!product || (product && routeParams.productId !== product.id)) && routeParams.productId !== 'new') {
		return <FuseLoading />;
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
								{/* <FuseAnimate animation="transition.expandIn" delay={300}>
									{form.images.length > 0 && form.featuredImageId ? (
										<img
											className="w-32 sm:w-48 rounded"
											src={_.find(form.images, { id: form.featuredImageId }).url}
											alt={form.name}
										/>
									) : (
										<img
											className="w-32 sm:w-48 rounded"
											src="assets/images/ecommerce/product-image-placeholder.png"
											alt={form.name}
										/>
									)}
								</FuseAnimate> */}
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
								onClick={() => dispatch(saveProduct(form))}
							>
								Adaugă
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
					{/* <Tab className="h-64 normal-case" label="Product Images" /> */}
					<Tab className="h-64 normal-case" label="Ingrediente" />
					{/* <Tab className="h-64 normal-case" label="Inventory" /> */}
					{/* <Tab className="h-64 normal-case" label="Shipping" /> */}
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
									value={priceRangeValues.find(item =>item.value==form.priceRange)}
									options={priceRangeValues}
									onChange={value => {console.log(value);
										 handleChipChange(value, 'priceRange')}}
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
								<IngredeinteFields numar={5} form={form} numarIngrediente={3}></IngredeinteFields>
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
