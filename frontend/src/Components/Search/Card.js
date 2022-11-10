import React from 'react'
import styles from './Card.module.css'
const API_BASE = 'http://localhost:8081/'

export default function Card(props) {
    const [restaurant, setRestaurant] = React.useState({
      img: props.photo.images.medium.url,
      name: props.name,
      address: props.address,
      phone: props.phone
    })

    const isOpen = !props.open_now_text ? 'Open Now' : 'Closed'
    const ranking = props.ranking
    const website = props.web_url
   // const restaurantType = props.cuisine[0].name

    function saveRestaurant() {

        fetch(API_BASE + 'restaurants/save', {
          method: 'POST',
          cache: 'no-cache',
            headers: {
            'Content-Type': 'application/json'
            },
          body: JSON.stringify(restaurant)
        }, console.log(restaurant))
        .then((response) => {
          if (response.ok) {
            alert("Restaurant Saved!")
          } 
        })
        .catch(err => {
          console.error(err)
          alert("Could not save")
        })
        
    }

    function redirect() {
        window.open(website) 
    }

  return (
    <div className={styles.card}>
        <img className={styles.cardimg} src={restaurant.img}/>
        <div className={styles.namecontainer}>
           <p className={styles.name}>{restaurant.name}</p>
        </div>
        {/* {href={website}} adding this below removes console bug, but makes page change */} 
        <a href className={styles.website} onClick={() => redirect()}>{website}</a>
        {/* <h1 className={styles.cardh1}>{restaurantType}</h1> bug here*/} 
        <h1 className={styles.address}>{restaurant.address}</h1>
        <h1 className={styles.isopen}>{isOpen}</h1>
        <h1 className={styles.phone}>{restaurant.phone}</h1>
        <h1 className={styles.ranking}>{ranking}</h1>
        <br></br>
        <input className={styles.cardbutton} type='button' onClick={() => saveRestaurant()} value='Save'/>
    </div>
  )
}
