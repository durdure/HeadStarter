import React , {useState}from 'react'
import { TextField, Button } from '@mui/material';
import { db } from './../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

const AddItems = () => {
   const [items, setItems] = useState('');
   const [quantity, setQuantity] = useState('');

   const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await addDoc(collection(db, "items"), {
        items: items,
        quantity: parseInt(quantity)
      });
      setItems('');
      setQuantity('');
    }catch(err){
      console.error("Error adding element: ",err);
    }
   }
  

  return (
    <form onSubmit={handleSubmit}>
      <TextField 
      label="Item"
      value={items}
      onChange={(e) => setItems(e.target.value)}
      required
      />
      <TextField
      label="quality"
      value={quantity}
      onChange={(e) => setQuantity(e.target.value)}
      required
      type="number"
      />

      <Button type='submit' variant="contained" color="primary">
        Add Item
      </Button>
      

      

    </form>
  )
}

export default AddItems