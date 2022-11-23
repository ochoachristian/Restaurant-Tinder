import React from 'react'
import axios from 'axios'
import styles from "./VotingCard.module.css"
const API_BASE = 'http://localhost:8081/'


export default function VotingCard(props) {
  const [voted, setVoted] = React.useState(false)
  const [phoneButton, setPhoneButton] = React.useState("Call to Order")
  const [restaurant, setRestaurant] = React.useState({
    image: props.image,
    name: props.name,
    url: props.url,
    address: props.address,
    phoneNumber: props.phone,
    userId: props.userId,
    restaurantId: props.restaurantId
  }) 

  async function getVoteId(){
    
    const res = await getRestaurantId()
    const voteId = await axios.get(API_BASE + "votes/" + res)
   // console.log(voteId);
    return voteId;
  }

  async function getRestaurantId() {
    const restaurantId = await axios.get(API_BASE + "restaurants/", {params : {name:restaurant.name}});
   // console.log(restaurantId.data)
    return restaurantId.data
  }

  async function increment(event) {
   
    if (!voted) { 
    event.target.disabled = true
    const res = await getVoteId()
    const id = res.data
    //return console.log(id)

    const like = await axios.post(API_BASE +'vote/increment/' + id)
    alert("liked")
    setVoted(true)
    return console.log(like)
  }
  }

  async function decrement(event){

    if (!voted) {
    event.target.disabled = true
    const res = await getVoteId()
    const id = res.data
    const dislike = await axios.post(API_BASE + "vote/decrement/" + id)
     alert("disliked")
     setVoted(true)
     console.log(voted)
     return console.log(dislike)
    }

  }

  function handlePhone() {
    setPhoneButton(restaurant.phoneNumber)
  }

  function redirect() {
    window.open(restaurant.url) //opening a new tab with the link
}

  return (
    <div className={styles.card}>
      <img className={styles.cardimg} src={restaurant.image}/>
      <div className={styles.namecontainer}>
          <p className={styles.name}>{restaurant.name}</p>
      </div>
      <a href className={styles.website} onClick={() => redirect()}>{restaurant.url}</a>
     
      <h1 className={styles.address}>{restaurant.address}</h1>
      
      <br></br>
      <input className={styles.cardbutton} type='button' onClick={() => handlePhone()} value={phoneButton}/>

      <div className={styles.upDownBtn}>

          <button onClick={(event) => increment(event)} className={styles.tUp} type="submit">
          <div className='up'></div> LIKE
          </button>
        
          <button onClick={(event) => decrement(event)} className={styles.tDown}type="submit">
          <div className='down'></div>DISLIKE
          </button>

      </div>
      
    </div>
  )
}
