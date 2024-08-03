// components/AddItem.js
import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

const AddItem = ({ setItems }) => {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = {
      item,
      quantity: parseInt(quantity, 10),
    };

    try {
      const docRef = await addDoc(collection(db, 'pantry'), newItem);
      setItems((prevItems) => [...prevItems, { ...newItem, id: docRef.id }]);

      setItem('');
      setQuantity('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Item
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddItem;
