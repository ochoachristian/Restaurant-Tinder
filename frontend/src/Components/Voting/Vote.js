import React from 'react'
import styles from './Vote.module.css'
import axios from 'axios'
import moment from 'moment'
import VotingCard from './VotingCard'
const API_BASE = 'http://localhost:8081/'

export default function Vote() {

    const pathName = window.location.pathname
    const guestId = pathName.substring(7)
    const [restaurants, setRestaurants] = React.useState()
    const currentTime = moment()._d
    const [datePassed, setDatePassed] = React.useState()


    React.useEffect(() => {
        getRestaurants(guestId)
        }, [])

    React.useEffect(() => {
        checkDate()
        }, [!datePassed])

    async function checkDate() {
        const date = await getDecisionDate()
        console.log("decision date = " + date + " now = " + currentTime)
        console.log(!moment(currentTime).isBefore(date))
        const isBefore = moment(currentTime).isBefore(date) //if date passed it will return false
        setDatePassed(!isBefore) //set state to true if date passed. boolean will hold false.

       //return !moment(currentTime).isBefore(date)
    }

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
      //   console.log(decisionDate)
         return decisionDate 
    }

     /**displays restaurants */
     function display() {

        const savedCard = restaurants.map(item => {
            // console.log(item)
            return (
                <VotingCard key={item.restaurant_id} {...item}/>
            )
        })
        return savedCard
        }

  return (
    <div>

        { datePassed == false ?

        <div> 
            <h1 className={styles.h1} onClick={() => console.log("here")}>Vote Down Below!</h1>
            {restaurants && <section className={styles.cardlist}>{display()}</section>}
        </div>

        : 
        
        <h2 className={styles.h2}>Voting period has ended</h2>
        
        }

    </div>
  )
}
