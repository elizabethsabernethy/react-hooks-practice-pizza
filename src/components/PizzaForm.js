import React, { useState } from "react";

function PizzaForm({pizza, updatePizza}) {

  const[formData, setFormData] = useState({
    topping: '',
    size: '',
    vegetarian: false
  })

function handleFormSubmit(event){
  event.preventDefault();
  const pizzaData = {
    "topping": formData.topping,
    "size": formData.size,
    "vegetarian" : false
  }
  if(formData.vegetarian === 'Vegetarian'){
    pizzaData.vegetarian = true;
  }
  fetch(`http://localhost:3001/pizzas/${pizza.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pizzaData),
    })
      .then((resp) => resp.json())
      .then((updatedPizza) => updatePizza(updatedPizza));
}

function handleChange(event) {
  setFormData({
    ...formData,
    [event.target.name]: event.target.value,
  });
}

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            onChange={handleChange}
            className="form-control"
            type="text"
            name="topping"
          />
        </div>
        <div className="col">
          <select className="form-control" name="size" onChange={handleChange}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              onClick={handleChange}
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Vegetarian"
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              onClick={handleChange}
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Not Vegetarian"
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
