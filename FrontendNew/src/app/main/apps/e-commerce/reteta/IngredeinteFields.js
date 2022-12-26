import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import { Box, Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useTheme } from 'styled-components';
import reducer from '../store';
import { getIngrediente, selectIngrediente } from '../store/ingredienteSlice';
import { getProduct, getWorkingNewProduct, newProduct, selectProduct } from '../store/productSlice';


let ingredientId = 0;
let cantitate = 0;

let ingredientCantitateNew = [
    ingredientId,
    cantitate
]


function IngredeinteFields(props) {
    
    const dispatch = useDispatch();
    const ingrediente = useSelector(selectIngrediente);
	const product = useSelector(({ eCommerceApp }) => eCommerceApp.product);
	const theme = useTheme();

	const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);
	const { form, handleChange, setForm } = useForm(props.form);
	const routeParams = useParams();

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

    function handleIngredienteChange(value,index) {
		console.log(value)
		setForm(
			_.set(
				{ ...form },
				'ingredientCantitate',
				value
			)
		);
        console.log(form)
        props.handleForm(form);
	}


    useEffect(() =>{
        createIngrediente(props)
        dispatch(getIngrediente())
    },[])




    let ingredientCantitateCopy = []
    function createIngrediente(props, type){
        for(let i=0; i<props.numarIngrediente;i++){
            ingredientCantitateCopy.push(ingredientCantitateNew)
        }
        handleIngredienteChange(ingredientCantitateCopy)
    }


    function modifyIngrediente(type, value, index){
        console.log(form.ingredientCantitate)
        let ingredientCantitateCopy = [...form.ingredientCantitate] // create a new array using the spread operator
        if (type === 'ingredientId') {
          let ingredientCantitateUpdate = [...ingredientCantitateCopy[index]]; // create a new inner array using the spread operator
          ingredientCantitateUpdate[0] = value
          ingredientCantitateCopy[index] = ingredientCantitateUpdate
          console.log(ingredientCantitateCopy)
        }
        if (type === 'cantitate') {
          let ingredientCantitateUpdate = [...ingredientCantitateCopy[index]]; // create a new inner array using the spread operator
          ingredientCantitateUpdate[1] = value
          ingredientCantitateCopy[index] = ingredientCantitateUpdate
        }
        console.log(type, index, value)
        handleIngredienteChange(ingredientCantitateCopy)
        console.log("IngredienteState:"+form.ingredientCantitate)

    }

    function textFields(){
        let returnText = [];
        for(let index=0; index<form.ingredientCantitate.length;index++){
            returnText.push( 
            <Container key={index} width={100} margin={0}>
            <TextField
            className="mt-8 mb-16"
            required
            label="Denumire Ingredient"
            key={index}
            autoFocus
            id="denumire_ingredient"
            name="denumire_ingredient"
            value={form.ingredientCantitate[index][0]}
            // options={ingrediente.map((ingredient) =>({
            //     value: ingredient.id,
            //     label: ingredient.denumire
            // }))} // DE CONTINUAT CU OPTIONS DE AICI
            options={ingrediente}
            onChange={(event) => {modifyIngrediente('ingredientId', event.target.value, index)}}
            variant="outlined"
            style = {{width: 600}}
        />

        <TextField
            className="mt-8 mb-16"
            id="cantitate"
            name="cantitate"
            label="Cantitate"
            value={form.ingredientCantitate[index][1]}
            onChange={(event) => {modifyIngrediente('cantitate', event.target.value, index)}}
            type="number"
            variant="outlined"
            autoFocus
            style = {{width: 200, paddingLeft:70}}
        />

        </Container>

            )
          }
        console.log(returnText)
        return returnText;
        }



    return (
        
           form && ( 
            <div>
                {textFields()}
            </div>
            )
    )

}

export default withReducer('eCommerceApp', reducer)(IngredeinteFields);
