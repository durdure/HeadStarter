import React, {useEffect, useState} from 'react'
import { db } from './../lib/firebase';
import { collection, query, onSnapshot, doc } from 'firebase/firestore';

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(()=>{
        const q = query(collection(db, "items"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const item = [];
            querySnapshot.forEach((doc)=>{
                items.push({
                    ...doc.data(), 
                    id:doc.id
                })
            })
            setItems(items);
        })
        return () => unsubscribe();
    },[])
  return (
    <div>
        <h2>Pantry Items</h2>
        <ul>
          {items.map((item)=>(
            <li key={items.id}>
                {item.item} - {item.quantity}
            </li>
          ))}
        </ul>
    </div>
  )
}

export default ItemList