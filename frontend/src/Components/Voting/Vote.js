import React from 'react'
import styles from './Vote.module.css'
import SavedCard from '../Invite/SavedCard'
import axios from 'axios'
const API_BASE = 'http://localhost:8081/'

export default function Vote() {

    const pathName = window.location.pathname
    const guestId = pathName.substring(7)
    const [restaurants, setRestaurants] = React.useState()

    React.useEffect(() => {
        getRestaurants(guestId)
        }, [])

    async function getInvitationId() {
        const invitationId = await (await axios.get(API_BASE + "guest/" + guestId)).data.invitationId
        return invitationId
    }

    /** get the host saved list */
    function getRestaurants(id) {
    
        fetch(API_BASE + 'restaurants/invitation/guest/' + id, {
        method: 'GET',
        cache: 'no-cache',
            headers: {
            'Content-Type': 'application/json'
            },
        }, )
        .then(response => response.json())
        .then(res => setRestaurants(res))
    }

    async function getDecisionDate() {
        
        const invitationId = await getInvitationId()
        //return console.log(invitationId)
        
         const res = await axios.get(API_BASE + "invitation/" + invitationId)//grabs invite details
         const decisionDate = res.data.decisionDate
         console.log(decisionDate)
         return decisionDate 
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

  return (
    <div>
        <h1 className={styles.h1} onClick={() => getDecisionDate()}>Vote Down Below!</h1>
        {restaurants && <section className={styles.cardlist}>{display()}</section>}
        
    </div>
  )
}
