import React , {useState}from 'react'
import { TextField,
      Button,
      Table,
      TableBody,
      TableCell,
      TableContainer,
      TableHead,
      TableRow,
      Paper, 
      IconButton} from '@mui/material';
import { db } from './../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import {v4 as uuidv4} from 'uuid';
import {getStorage, ref, upLoadBytes, getDownloadURL} from 'firebase/storage';

const AddItems = () => {
  const [item, setItem] = useState('');
  const [items, setItems] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState('');


  const handleAdd = async () => {
    setItems([...items, {item, quantity: parseInt(quantity)}]);
    setItem('');
    setQuantity('');

  };

  const handleRemove = (index) => {
    const newItems = items.filter((_, i) => i !== index); 
    setItems(newItems);
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      for (const item of items){
        await addDoc(collection(db, 'pantry'), item);
      }
    }catch(err){
      console.error("Error adding element: ",err);
    }
   }
  

  return (
    <div 
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      backgroundColor: '#f9f9f9',
      width: '40%',
    }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
        label="Item"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        required
        style={{marginRight: '10px'}}
        />
        <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
        style={{marginRight: '10px'}}
        />
        <Button 
        onClick={handleAdd}
        variant='contained' 
        color='primary'
        style={{marginRight: '10px'}}
        >
          Add to list
        </Button>
        <Button
        type='submit'
        variant='contained'
        color='primary'
        >
          Submit
        </Button>
      </form>

      <TableContainer 
      component={Paper} 
      style={{marginTop:'20px'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {Array.isArray(items) && items.length > 0 ? (
              items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.item}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleRemove(index)}
                      variant="contained"
                      color="secondary"
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No items to display</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
export default AddItems