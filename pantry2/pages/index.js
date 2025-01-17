import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import AddItem from '../components/AddItems';
import ItemList from '../components/ItemList';
import DisplayItem from '../components/DisplayItem';
import { TextField, Typography } from '@mui/material';
import styles from '../styles/Home.module.css';


const Home = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'pantry'), (snapshot) => {
      const itemsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setItems(itemsData);
    });

    return () => unsubscribe();
  }, []);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className={styles.container}>
    <div className={styles.logoContainer}>
        <h2 className={styles.logo}>Pantry</h2>
      </div>
      
     
      <div className={styles.addItem}>
        <Typography variant="h4" gutterBottom>
          Add Item
        </Typography>
        <AddItem setItems={setItems} />
      </div>
      <div className={styles.displayItem}>
        <Typography variant="h4" gutterBottom>
          Item Details
        </Typography>
        <DisplayItem item={selectedItem} />
      </div>
      <div className={styles.itemList}>
        <Typography variant="h4" gutterBottom>
          Pantry Items
        </Typography>
        <TextField
          label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          className={styles.textField}
        />
        <ItemList items={items} searchTerm={searchTerm} onSelectItem={handleSelectItem} />
      </div>
    </div>
  );
};

export default Home;
