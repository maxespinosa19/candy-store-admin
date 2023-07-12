import { useState } from 'react';
import './App.css';

function App() {
  const [candyList, setCandyList] = useState()
  const getAllCandy = () => {
    fetch('https://express-firestore-me.web.app/candy')
    .then(response => response.json())
    .then(setCandyList)
    .catch(alert)
  }

  const addNewCandy = (e) => {
    e.preventDefault()
    const newCandy = {
      name: e.target.name.value,
      size: e.target.size.value,
      price: e.target.price.value,
      calories: e.target.calories.value,

    }
    fetch('https://express-firestore-me.web.app/candy', {
      method: "POST", //if method not specified, assumes "GET"
      headers: {
        'Content-type': 'application/json', //required to tell the API we are sending JSON
      },
      body: JSON.stringify(newCandy) //this sends the object in perfect JSON format ot the API 
    })
    .then(response => response.json())
    .then(setCandyList)
    .catch(alert)
    .finally(()=>{
      e.target.name.value = ''
      e.target.size.value = ''
      e.target.price.value = ''
      e.target.calories.value = ''
    })
  }
  return (
    <main>
      <h1> Add Your Candy!</h1>

  <form onSubmit={addNewCandy}>
    <label htmlFor="name">
      Name: <input type="text" name="name"/>
      </label><br />
    <label htmlFor="size">
      Size: <input type="text" name="size"/>
      </label><br />
    <label htmlFor="price">
      Price: <input type="text" name="price"/>
      </label><br />
    <label htmlFor="calories">
      Calories: <input type="text" name="calories"/>
      </label><br />
    <input type="submit" value="Add Candy"/>
      </form>


    <h1> Candy Store</h1>
    <h2>All The Candy  <button onClick={getAllCandy}>Gimme</button> 
    </h2>
    <table>
      <thead>
        <td> Name</td>
        <td> Size</td>
        <td> Price</td>
        <td> Cal</td>
      </thead>
      <tbody>
    {candyList &&
      candyList.map(candy => (
       <tr key ={candy.id}>
        <td>{candy.name}</td>
        <td>{candy.size}</td>
        <td>${candy.price}</td>
        <td>{candy.calories}</td>
        </tr>
      ))
      }
      </tbody>
   </table>
    </main>
     
  )
}

export default App;
