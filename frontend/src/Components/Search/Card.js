import React from 'react'
import styles from './Card.module.css'
import axios from 'axios'
import {useSelector} from 'react-redux'
const API_BASE = 'http://localhost:8081/'

export default function Card(props) {
    const userId = useSelector((state) => state.user.id) //grabbing userId from redux
    const [phoneButton, setPhoneButton] = React.useState("Call to Order")
    const [restaurant, setRestaurant] = React.useState({ //using this to POST to our saved_restaurants table upon save
      image: props.photo.images.medium.url,
      name: props.name,
      url: props.web_url,
      address: props.address,
      phoneNumber: props.phone,
      userId: userId
    })

    const isOpen = props.open_now_text ? props.open_now_text : 'Closed'
    const ranking = props.ranking
    const website = props.web_url
    const rating = props.rating

    function handlePhone() {
      setPhoneButton(restaurant.phoneNumber)
    }

    async function getRestaurantId() {
      const restaurantId = await axios.get(API_BASE + "restaurants/", {params : {name:restaurant.name}});
    //console.log(restaurantId.data)
      return restaurantId.data
    }

    async function getInvitationId() {
      const invitationId = await axios.get(API_BASE + "invitations/" + userId);
    //console.log(invitationId.data)
      return invitationId.data
    }

    async function saveToVotes() {

      const res = await getRestaurantId()
      const inv = await getInvitationId()
      return axios.post(API_BASE + "votes/create", {
        restaurantId: res,
        invitationId: inv
      })
      .then((response) => console.log(response))
    }
    
    /**saves restaurant to saved_restaurants and votes tables */
    async function saveRestaurant() {
      saveToVotes()
      
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
      <a className={styles.website} onClick={() => redirect()}>{website}</a>
      <h1 className={styles.address}>{restaurant.address}</h1>
      <h1 className={styles.isopen}>{isOpen}</h1>
      <h1 className={styles.ranking}>{ranking}</h1>
      <br></br>
      {/* <input className={styles.cardbutton} type='button' onClick={() => saveToVotes()} value="votesTest"/> */}
      <br></br>
      <input className={styles.cardbutton} type='button' onClick={() => handlePhone()} value={phoneButton}/>
      <br></br>
      <input className={styles.cardbutton} type='button' onClick={() => saveRestaurant()} value='Save to My Invitation'/>
    </div>
  )
}