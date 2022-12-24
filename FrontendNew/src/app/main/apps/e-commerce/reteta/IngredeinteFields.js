import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import { Box, Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reducer from '../store';
import { getIngrediente, selectIngrediente } from '../store/ingredienteSlice';




function IngredeinteFields(props) {

    const { form, handleChange, setForm } = useForm(null);

    const dispatch = useDispatch();
	// const ingrediente = useSelector(({ eCommerceApp }) => eCommerceApp.ingrediente.entities);
	const ingrediente = useSelector(selectIngrediente);

    useEffect(() =>{
        dispatch(getIngrediente())
    },[])

    useEffect(() =>{
        if  (typeof ingredientCantitateList != "undefined" && ingredientCantitateList != null && ingredientCantitateList.length != null
            && ingredientCantitateList.length > 0){
            ingredientCantitateList = []
            createIngrediente(props)
            }
        else{
            createIngrediente(props)
        }

        },[props.numarIngrediente])

	function handleChipChange(value, name) {
		console.log(value, name)
		setForm(
			_.set(
				{ ...props.form },
				name,
				value.value
			)
		);
	}

    let ingredientCantitateList = []

    function createIngrediente(props){
        for(let i=0; i<props.numarIngrediente; i++){

            let ingredientId = 0;

            let cantitate = 0;

            let ingredientCantitate = [
                ingredientId,
                cantitate
        ]
            ingredientCantitateList.push(ingredientCantitate)
        }
        console.log(ingredientCantitateList)
        console.log(ingrediente)
        return textFields(ingredientCantitateList)
        }




    function textFields(ingredientCantitateList){
        let returnText = [];
        console.log(ingredientCantitateList)
        ingredientCantitateList.forEach((item,index)=>{
            returnText.push( 
            <Container key={index} width={100} margin={0}>
            <TextField
            className="mt-8 mb-16"
            required
            label="Denumire"
            autoFocus
            id="denumire"
            name="denumire"
            // value={form.denumire}
            options={ingrediente.map((ingredient) =>({
                label: ingredient.denumire
            }))} // DE CONTINUAT CU OPTIONS DE AICI
            onChange={handleChange}
            variant="outlined"
            style = {{width: 600}}
        />


                                <TextField
									className="mt-8 mb-16"
									id="calorii"
									name="calorii"
									label="Calorii"
									// value={form.calorii}
									onChange={handleChange}
									type="number"
									variant="outlined"
									autoFocus
                                    style = {{width: 200, paddingLeft:70}}
								/>

        </Container>

            )
          })
        console.log(returnText)
        return returnText;
        }


	return (
        <div>
            {createIngrediente(props)}
        </div>);
}

export default withReducer('eCommerceApp', reducer)(IngredeinteFields);
