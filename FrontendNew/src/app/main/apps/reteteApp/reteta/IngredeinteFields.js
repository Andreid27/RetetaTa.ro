import FuseChipSelect from '@fuse/core/FuseChipSelect';
import { useForm } from '@fuse/hooks';
import _ from '@lodash';
import { Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import withReducer from 'app/store/withReducer';
import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reducer from '../store';
import { getIngrediente, selectIngrediente } from '../store/ingredienteSlice';


let ingredientId = 0;
let cantitate = 0;

let ingredientCantitateNew = [
    ingredientId,
    cantitate
]


function IngredeinteFields(props) {
    
    const dispatch = useDispatch();
    const ingrediente = useSelector(selectIngrediente);
	const product = useSelector(({ reteteApp }) => reteteApp.product);

	const { form, setForm } = useForm(props.form);

	useEffect(() => {
		if ((product && !form) || (product && form && product.id !== form.id)) {
			setForm(product);
		}
	}, [form, product, setForm]);


    function handleIngredienteChange(value,index) {
		// console.log(value)
		setForm(
			_.set(
				{ ...form },
				'ingredientCantitate',
				value
			)
		);
        // console.log(form)
        props.handleForm(form);
	}


    useEffect(() =>{
        dispatch(getIngrediente())
    },[])

    useEffect(() =>{
        createIngrediente(props)
    },[props.numarIngrediente])




    let ingredientCantitateCopy = []
    function createIngrediente(props, type){
        for(let i=0; i<props.numarIngrediente;i++){
            ingredientCantitateCopy.push(ingredientCantitateNew)
        }
        handleIngredienteChange(ingredientCantitateCopy)
    }


    function modifyIngrediente(type, value, index){
        // console.log(form.ingredientCantitate)
        let ingredientCantitateCopy = [...form.ingredientCantitate] // create a new array using the spread operator
        if (type === 'ingredientId') {
          let ingredientCantitateUpdate = [...ingredientCantitateCopy[index]]; // create a new inner array using the spread operator
          ingredientCantitateUpdate[0] = value
          ingredientCantitateCopy[index] = ingredientCantitateUpdate
        //   console.log(ingredientCantitateCopy)
        }
        if (type === 'cantitate') {
          let ingredientCantitateUpdate = [...ingredientCantitateCopy[index]]; // create a new inner array using the spread operator
          ingredientCantitateUpdate[1] = value
          ingredientCantitateCopy[index] = ingredientCantitateUpdate
        }
        // console.log(type, index, value)
        handleIngredienteChange(ingredientCantitateCopy)
        // console.log("IngredienteState:"+form.ingredientCantitate)

    }

    function textFields(){
        let returnText = [];
        for(let index=0; index<form.ingredientCantitate.length;index++){
            returnText.push( 
            <Container key={index} width={100} margin={0} >
                <FuseChipSelect
                className="mt-8 mb-16"
                required
                label="Denumire Ingredient"
                key={index}
                autoFocus
                id="denumire_ingredient"
                name="denumire_ingredient"
                value={ingrediente.find(item =>item.value===form.ingredientCantitate[index][0])}
                options={ingrediente.map((ingredient) =>({
                    value: ingredient.id,
                    label: ingredient.denumire
                }))} 
                // options={ingrediente}
                onChange={(event) => {console.log(event.value)
                    modifyIngrediente('ingredientId', event.value, index)}}
                textFieldProps={{
                    label: 'Pret',
                    InputLabelProps: {
                        shrink: true
                    },
                    variant: 'outlined'
                }}
                style={{ width: 400 }}
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
        // console.log(returnText)
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

export default withReducer('reteteApp', reducer)(IngredeinteFields);
