import React from 'react'
import styles from './Search.module.css'
import Card from './Card'
import {Link} from 'react-router-dom'
const BASE_URL = "https://worldwide-restaurants.p.rapidapi.com/"
const API_KEY = "95802c6db3msh3e00ca1de0e7acbp1f866ejsn3563679d9549"

export default function Search() {
    const [city, setCity] = React.useState()
    const [restaurants, setRestaurants] = React.useState()

    /**making api call to get location id, then calling fetch restaurants api*/
     async function fetchLocation() {
       let location

       try {

       
          const encodedParams = new URLSearchParams();
          encodedParams.append("q", city);
          encodedParams.append("language", "en_US");

          const options = {
          method: 'POST',
          headers: {
              'content-type': 'application/x-www-form-urlencoded',
              'X-RapidAPI-Key': API_KEY,
              'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com'
              },
              body : encodedParams
              }

          const data = await fetch(BASE_URL + 'typeahead', options)
          const response = await data.json()

          location = response.results.data[0].result_object.location_id
          return fetchRestaurants(location)
        } catch (e) {

          alert("Could not find city")
        }

    }

  /**fetches restaurants by location id*/
  function fetchRestaurants(location) {    
    
   try {
        const encodedParams = new URLSearchParams();
        encodedParams.append("language", "en_US");
        encodedParams.append("limit", "50"); //grabbing top 50 restaurants
        encodedParams.append("location_id", location);
        encodedParams.append("currency", "USD");

        const options = {
          method: 'POST',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com'
          },
          body: encodedParams
        };

        fetch(BASE_URL + 'search', options)
        .then(response => response.json())
        .then(res => setRestaurants(res.results.data))
      } catch(e) {
        alert("Could not find city")
      }
  }

    /**displays restaurants */
    function display() {
        const card = restaurants.map(item => {
           return (
             <Card key={item.location_id} {...item}/>
           )
        })
        return card
      }

  return (
    <div>
        <h1 className={styles.title}>Search For The Best Restaurants In Your City!</h1>
        <div className={styles.userinput}>
        <label className={styles.label}>Enter City</label>
        <br></br>
        <input className={styles.input} type="text" onChange={(event) => setCity(event.target.value)} id="city" name="city" placeholder="Ex: Brooklyn, NY" />
        <br></br>
        <Link className={styles.link} to='/invite'>Take me to my Invitation</Link>
        <br></br>
        <input className={styles.search} type='button' onClick={() => fetchLocation()} value='Search'/>
        <br></br>
        </div>
        {restaurants && <section className={styles.cardlist} >{display()}</section>}
        <br></br>
    </div>
  )
}
