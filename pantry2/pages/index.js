import React from "react";
import AddItems from "../components/AddItems";
import ItemList from "../components/ItemList";
import Display from "../components/Display";


export default function Home() {
  return (
    <div 
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '10%'
    }}
    >
      <AddItems/>
      <Display/>
      <ItemList/>
    </div>
  );
}
