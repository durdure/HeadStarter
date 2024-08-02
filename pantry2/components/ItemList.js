import React, {useEffect, useState} from 'react'
import { db } from './../lib/firebase';
import { collection, query, onSnapshot, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { getStorage, uploadBytes } from 'firebase/storage';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editQuantity, setEditQuantity] = useState('');
  const [editImage, setEditImage] = useState(null);


  useEffect(() => {
    const q = query(collection(db, 'pantry'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setItems(items);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'pantry', id));
      setItems(items.filter((item) => item.id !== id));
    }catch (error) {
      console.error('Error removing document: ', error);
    }
  };


  const handleEditOpen = () => {
    setEditItem(items);
    setEditQuantity(items.quantity);
    setEditOpen(true);
  }

  const handleEditClose = () => {
    setEditOpen(false);
    setEditItem(null);
    setEditQuantity('');
    setEditImage(null);
  };


  const handleEditSave = async () => {
    const itemDoc = doc(db, 'pantry', editItem.id);
    const updatedData = { quantity: parseInt(editQuantity, 10) };

    if (editImage) {
      const imageName = uuidv4() + '-' + editImage.name;
      const storage = getStorage();
      const storageRef = ref(storage, 'images/' + imageName);

      try {
        await uploadBytes(storageRef, editImage);
        const imageUrl = await getDownloadURL(storageRef);
        updatedData.imageUrl = imageUrl;
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }

    try {
      await updateDoc(itemDoc, updatedData);
      setItems(items.map(item => (item.id === editItem.id ? { ...item, ...updatedData } : item)));
      handleEditClose();
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }
    

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>image</TableCell>
             <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}
            className='hover:bg-gray-100'
            >
              <TableCell>{item.item}</TableCell>
              <TableCell>{item.quantity}</TableCell>
               <TableCell>
                <img
                src={item.imageUrl}
                alt={item.items}
                className='h-10 w-10 flex-shrink-0 object-cover object-center'
                />
               </TableCell>
              
               <TableCell>
                <Button
                className='mr-2 col-primary-500'
                onClick={() => handleEditOpen(item)}
                variant='contained'
                color='primary'
                >
                  Edit
                </Button>
                <Button
                onClick={() => handleDelete(item.id)}
                className='col-primary-500, bg-red-500, variant=contained'
                >
                 Remove
                </Button>
               </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>
          Edit Item
        </DialogTitle>
        <DialogContent>
          <TextField
          label='Quantity'
          value={editQuantity}
          onChange={(e) => setEditQuantity(e.target.value)}
          fullWidth
          className='m-normal'
          type='number'
          />
          <input
          type='file'
          accept='image/*'
          onChange={(e) => setEditImage(e.target.files[0])}
          className='mt-20px'
          />         
        </DialogContent>
        <DialogActions>
          <button
          onClick={handleEditClose} 
          className='bg-red-500 text-white p-10 rounded-md col-primary-500'
          >
            Cancle
          </button>
          <button
          onClick={handleEditSave}
          className='bg-green-500 text-white p-10 rounded-md col-primary-500'

          >
           Save
          </button>
        </DialogActions>
      </Dialog>




    </TableContainer>
  );
};

export default ItemList;