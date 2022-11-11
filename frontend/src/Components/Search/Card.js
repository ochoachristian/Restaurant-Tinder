import React from 'react'
import styles from './Card.module.css'
import {useSelector} from 'react-redux'
const API_BASE = 'http://localhost:8081/'

export default function Card(props) {
    const userId = useSelector((state) => state.user.id) //grabbing userId from redux
    const [phoneButton, setPhoneButton] = React.useState("Call to Order")
    const [restaurant, setRestaurant] = React.useState({ //using this to POST to our database upon save
      image: props.photo.images.medium.url,
      name: props.name,
      address: props.address,
      phoneNumber: props.phone,
      userId: userId
    })

    const isOpen = props.open_now_text ? props.open_now_text : 'Closed'
    const ranking = props.ranking
    const website = props.web_url
    const rating = props.rating
    // const restaurantType = props.cuisine[0].name ? props.cuisine[0].name : null //causing bugs

    function handlePhone() {
      setPhoneButton(restaurant.phoneNumber)
    }

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
        window.open(website) //opening a new tab with the link
    }

  return (
    <div className={styles.card}>
      <div className={styles.rating}>{rating} </div>
      <img className={styles.cardimg} src={restaurant.image}/>
      <div className={styles.namecontainer}>
          <p className={styles.name}>{restaurant.name}</p>
      </div>
      {/* {href={website}} adding this below removes console bug, but makes main page change onclick */} 
      <a href className={styles.website} onClick={() => redirect()}>{website}</a>
      <h1 className={styles.address}>{restaurant.address}</h1>
      <h1 className={styles.isopen}>{isOpen}</h1>
      <h1 className={styles.ranking}>{ranking}</h1>
      
      <br></br>
      <input className={styles.cardbutton} type='button' onClick={() => handlePhone()} value={phoneButton}/>
      <br></br>
      <input className={styles.cardbutton} type='button' onClick={() => saveRestaurant()} value='Save'/>
    </div>
  )
}
