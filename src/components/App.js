import React, { useEffect, useState } from "react";
import Header from "./Header";
import Pizza from "./Pizza";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {

const[pizzas, setPizzas] = useState([])
const[toBeEdited, setToBeEdited] = useState({
  topping: 'Pizza Topping',
  size: 'Small',
  vegetarian: false
})

useEffect(()=>{
  fetch('http://localhost:3001/pizzas')
  .then((resp)=>resp.json())
  .then((pizzas)=>setPizzas(pizzas))
},[])

function handleEdit(pizza){
const text = document.querySelector('input[type=text]')
text.setAttribute('value', pizza.topping)
const size = document.querySelector(`option[value=${pizza.size}]`)
size.setAttribute('selected', 'selected')
if(pizza.vegetarian){
  document.querySelector('input[value="Not Vegetarian"]').removeAttribute('checked')
  document.querySelector(`input[value=Vegetarian]`).setAttribute('checked', 'checked')
}
else if(!pizza.vegetarian){
  document.querySelector(`input[value=Vegetarian]`).removeAttribute('checked')
  document.querySelector('input[value="Not Vegetarian"]').setAttribute('checked', 'checked')
}
setToBeEdited(pizza)
}

function updatePizza(updatedPizza){
  const updatedPizzas = pizzas.map((pizza) =>{
    if(pizza.id === updatedPizza.id){
      return updatedPizza;
    }
    else{
      return pizza;
    }
  })
  setPizzas(updatedPizzas);
}


  return (
    <>
      <Header />
      <PizzaForm pizza={toBeEdited} updatePizza={updatePizza}/>
      <PizzaList pizzas={pizzas} onEdit={handleEdit}/>
    </>
  );
}

export default App;
