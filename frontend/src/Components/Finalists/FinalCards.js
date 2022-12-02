import React from 'react'
import axios from 'axios'
import styles from "./FinalCards.module.css"
import {useSelector} from 'react-redux'
const API_BASE = 'http://localhost:8081/'

export default function FinalCards(props) {

    const hostId = useSelector((state) => state.user.id)
    const [phoneButton, setPhoneButton] = React.useState("Call to Order")
    const [choiceMade, setChoiceMade] = React.useState(false)
    const [restaurant, setRestaurant] = React.useState({
        image: props.image,
        name: props.name,
        url: props.url,
        address: props.address,
        phoneNumber: props.phone,
        userId: props.userId,
        restaurantId: props.restaurantId
    })

    function handlePhone() {
        setPhoneButton(restaurant.phoneNumber)
    }

    function redirect() {
        window.open(restaurant.url) //opening a new tab with the link
    }

    async function getInvitationId() {
        const invitationId = await axios.get(API_BASE + "invitations/" + hostId);
        //console.log(invitationId.data)
        return invitationId.data 
     }

    async function makeSelection(event) {
        event.target.disabled = true
        console.log(props)
        const invitationId = await getInvitationId()
        const body = {
            restaurantId: restaurant.restaurantId,
            invitationId: invitationId
        }
      // console.log(body)
        const res = await axios.post(API_BASE + "invitation/update", body)
        console.log(res)
        setChoiceMade(true)
        alert("Invitation Updated!")
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
            <br></br>
            <input className={styles.cardbutton} type='button' onClick={(event) => makeSelection(event)} value="Select"/>

        </div>

  )
}
