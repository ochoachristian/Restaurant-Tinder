import React, { useEffect } from 'react'
import styles from './Invite.module.css'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import AddGuests from './AddGuests'
const API_BASE = 'http://localhost:8081/'

export default function Invite() {

  const userId = useSelector((state) => state.user.id)
  const [city, setCity] = React.useState()
  const [restaurants, setRestaurants] = React.useState()
  const [meetingDate, setMeetingDate] = React.useState()
  const [voteDate, setVoteDate] = React.useState()
  const [invCreated, setInvCreated] = React.useState(false)
  const [invExists, setInvExists] = React.useState(false)

  useEffect(() => {
    getRestaurants(userId)
    console.log(restaurants)
    getInvitationId()
    console.log(invExists)
  }, [invExists])

  async function getInvitationId() {
     const invitationId = await axios.get(API_BASE + "invitations/" + userId);
     console.log(invitationId.data)
     if (invitationId.data > 0 ){
      setInvExists(true)
     } else {
      setInvExists(false)
     }
     return invitationId.data 
  }

  /**sets state for datetime */
  function handleDate(event) {
    setMeetingDate(event.target.value)
   //moment(dateTime).format("dddd, MMMM Do YYYY, h:mm:ss a")
  }

  /**sets state for voting deadline */
  function handleVoteDate(event) {
    setVoteDate(event.target.value)
   //moment(dateTime).format("dddd, MMMM Do YYYY, h:mm:ss a")
  }

  /** get the user saved list */
  function getRestaurants(id) {
    //  console.log(userId)
        fetch(API_BASE + 'restaurants/' + id, {
        method: 'GET',
        cache: 'no-cache',
            headers: {
            'Content-Type': 'application/json'
            },
        }, )
        .then(response => response.json())
        .then(res => setRestaurants(res))
    }

  function createInvite() {

    const body = {
      hostId: userId,
      city: city,
      restaurantId: "",
      meetingDate: meetingDate,
      decisionDate: voteDate,
    }
  //  console.log(body)
    fetch(API_BASE +  "invitation/create", {
      method: 'POST',
      cache: 'no-cache',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    },  )
    .then(response => response.json())
     .then(res => console.log(res))
     setInvCreated(true)
    alert("invite created")
  }

  return (
    <div >

     { !invExists ? 

      <div className={styles.test}>
        
        <h1 className={styles.h1} >Create Your Invitation</h1>
        <br></br>

        <label className={styles.city}>Enter City</label>
        <input className={styles.input} type="text" onChange={(event) => setCity(event.target.value)} id="city" name="city" placeholder="Ex: Brooklyn, NY" />
        <label className={styles.text}>Enter Meeting Day and Time</label>

        <input type="datetime-local" onChange={(event) => handleDate(event)} id="datetime" name="datetime"/>
        {/* <input type='button' onClick={() => alert('date = ' +  meetingDate)} value='Test date'/> */}
        {/* <input type='button' onClick={() => alert('date = ' +  moment(dateTime).format("dddd, MMMM Do YYYY, h:mm:ss a"))} value='Test formatted date'/> */}
        
        <label className={styles.text}>Enter Last Day to Vote</label>
        <input type="datetime-local" onChange={(event) => handleVoteDate(event)} id="datetime" name="datetime"/>
        {/* <input type='button' onClick={() => alert('date = ' +  voteDate)} value='Test date'/> */}
        <br></br>
        <input className={styles.button} type='button' onClick={() => createInvite()} value='Create Invitation'/>
        {invCreated && <Redirect to='/search'/>}

      </div>

      :  
       <AddGuests />
     } 

    </div>
  )
}
