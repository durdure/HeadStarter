// components/ItemList.js
import React, { useState } from 'react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
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
import styles from '../styles/Home.module.css';

const ItemList = ({ items, searchTerm, onSelectItem }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editQuantity, setEditQuantity] = useState('');

  const handleRemove = async (id) => {
    try {
      await deleteDoc(doc(db, 'pantry', id));
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

  const handleEditOpen = (item) => {
    setEditItem(item);
    setEditQuantity(item.quantity);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditItem(null);
    setEditQuantity('');
  };

  const handleEditSave = async () => {
    const itemDoc = doc(db, 'pantry', editItem.id);
    const updatedData = { quantity: parseInt(editQuantity, 10) };

    try {
      await updateDoc(itemDoc, updatedData);
      handleEditClose();
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const filteredItems = items.filter((item) =>
    item.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredItems.map((item) => (
            <TableRow key={item.id} onClick={() => onSelectItem(item)} className={styles.tableRow}>
              <TableCell>{item.item}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditOpen(item);
                  }}
                  variant="contained"
                  color="primary"
                  className={styles.button}
                >
                  Edit
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(item.id);
                  }}
                  variant="contained"
                  color="secondary"
                  className={styles.button}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <TextField
            label="Quantity"
            value={editQuantity}
            onChange={(e) => setEditQuantity(e.target.value)}
            type="number"
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default ItemList;
