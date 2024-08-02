import React from "react";
import AddItems from "../components/AddItems";
import ItemList from "../components/ItemList";
import Display from "../components/Display";
import Footer from "../components/Footer/Footer";


export default function Home() {
  return (
    <>
      <div className="text-3xl font-bold bg-blue-600">
      <AddItems/>
      <Display/>
      <ItemList/>
    </div>
    <Footer/>
    </>
    
  );
}
