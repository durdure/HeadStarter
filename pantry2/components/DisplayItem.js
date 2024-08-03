// components/DisplayItem.js
import React from 'react';
import { Paper, Typography } from '@mui/material';
import styles from '../styles/Home.module.css';

const DisplayItem = ({ item }) => {
  if (!item) {
    return <Typography variant="h6">No item selected</Typography>;
  }

  return (
    <Paper className={styles.container}>
      <Typography variant="h5" className={styles.item}>
        {item.item}
      </Typography>
      <Typography variant="body1" className={styles.quantity}>
        Quantity: {item.quantity}
      </Typography>
    </Paper>
  );
};

export default DisplayItem;
