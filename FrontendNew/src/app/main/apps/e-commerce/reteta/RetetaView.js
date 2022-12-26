import { Button, makeStyles, TableCell, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Column, Table } from 'react-virtualized';




const useStyles = makeStyles({
    recipeContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '20px 0',
    },
    recipeTitle: {
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    ingredientTable: {
      width: '80%',
      margin: '20px 0',
    },
    instructionList: {
      width: '80%',
      margin: '20px 0',
    },
  });

const RetetaView = () => {
  const [expanded, setExpanded] = useState(false);
  const recipe = {
    name: 'Spaghetti Bolognese',
    ingredients: [
      { name: 'spaghetti', amount: '8 oz' },
      { name: 'ground beef', amount: '1 lb' },
      { name: 'diced tomatoes', amount: '28 oz can' },
      { name: 'tomato sauce', amount: '15 oz can' },
      { name: 'onion', amount: '1' },
      { name: 'garlic', amount: '3 cloves' },
      { name: 'olive oil', amount: '2 tbsp' },
      { name: 'oregano', amount: '1 tsp' },
      { name: 'basil', amount: '1 tsp' },
      { name: 'salt', amount: '1 tsp' },
      { name: 'pepper', amount: '1 tsp' },
    ],
    instructions: [
      'Bring a large pot of salted water to a boil and cook spaghetti according to package instructions.',
      'In a separate pan, heat the olive oil over medium heat. Add the diced onion and minced garlic and cook until the onion is translucent.',
      'Add the ground beef to the pan and cook until browned, breaking it up into small pieces as it cooks.',
      'Stir in the diced tomatoes, tomato sauce, oregano, basil, salt, and pepper. Reduce heat to low and simmer for 20 minutes.',
      'Drain the spaghetti and return it to the pot. Add the meat sauce and toss to combine.',
      'Serve the spaghetti bolognese hot, garnished with grated Parmesan cheese and fresh basil, if desired.',
    ],
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {recipe.name}
      </Typography>
      <Button onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Hide' : 'Show'} Ingredients
      </Button>
      {expanded && (
        <Table>
          <Column
            label="Ingredient"
            dataKey="name"
            width={200}
            cellRenderer={({ cellData }) => <TableCell>{cellData}</TableCell>}
          />
          <Column
            label="Amount"
            dataKey="amount"
            width={100}
            cellRenderer={({ cellData }) => <TableCell>{cellData}</TableCell>}
          />
        </Table>
      )}
      <Button onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Hide' : 'Show'} Instructions
      </Button>
      {expanded && (
        <ol>
          {recipe.instructions.map(instruction => (
            <li key={instruction}>{instruction}</li>
          ))}
        </ol>
      )}
    </div>);
}

export default RetetaView;