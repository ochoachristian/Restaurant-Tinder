import React from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import SavedCard from '../Invite/SavedCard'
import styles from './AddGuests.module.css'
const API_BASE = 'http://localhost:8081/'

export default function AddGuests() {

    const [restaurants, setRestaurants] = React.useState()
    const userId = useSelector((state) => state.user.id)
    const [guest, setGuest] = React.useState({
        name: "",
        email: "",
        invitationId: ""
    })

    React.useEffect(() => {
        getRestaurants(userId)
        }, [])

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

    /**displays restaurants */
    function display() {

    const savedCard = restaurants.map(item => {
        // console.log(item)
        return (
            <SavedCard key={item.restaurant_id} {...item}/>
        )
    })
    return savedCard
    }

    async function getInvitationId() {
        const invitationId = await axios.get(API_BASE + "invitations/" + userId);
      //console.log(invitationId.data)
        return await invitationId.data 
     }

     async function getGuestUrl(name) {
    
        return await axios.get(API_BASE + "guest", {params : {name : name}})
        .then((res) => "http://localhost:3000/guest/" + res.data)
     }

    async function AddGuests() {

        const id = await getInvitationId()
        setGuest((prev) => {
           return {
            ...prev,
            invitationId: id
           }
        }) 

       if (guest.name !== "") {

        const create = await axios.post(API_BASE + "guests/create", guest)
        const url = await getGuestUrl(guest.name)
        return alert("Guest added! Invite your guest using this url: " + url)
       // return console.log(url)

       } else {
        alert("Name cannot be empty")
       } 
    }

    function handleInputChange(event) {
        event.preventDefault()
        setGuest((prevState) => {
            return {
                ...prevState, [event.target.name]: event.target.value
            }
        })
    }

  return (
    <div>
        <h1 className={styles.h1}>My Invitation</h1>
        <label class="sr-only">name</label>
        <input className={styles.input} type="text" onChange={(event) => handleInputChange(event)} id="name" name="name" placeholder="name" />
        <br></br>
        <label class="sr-only">email</label>
        <input className={styles.input} type="text" onChange={(event) => handleInputChange(event)} name="email" placeholder="email"/>
        <br></br>
        <input className={styles.button} type='button' onClick={() => AddGuests()} value='Add Guest'/>
        {restaurants && <section className={styles.cardlist}>{display()}</section>}
    </div>
  )
}
