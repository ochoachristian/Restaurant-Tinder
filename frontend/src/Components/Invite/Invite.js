import React, { useEffect } from 'react'
import styles from './Invite.module.css'
import {useSelector} from 'react-redux'
import SavedCard from '../Invite/SavedCard'
const API_BASE = 'http://localhost:8081/'

export default function Invite() {

  const userId = useSelector((state) => state.user.id)
  const [restaurants, setRestaurants] = React.useState()
  const [dateTime, setDateTime] = React.useState()

  useEffect(() => {
    getRestaurants(userId)
  }, [])

    /** get the user saved list */
    function getRestaurants(id) {
      console.log(userId)
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
        console.log(item)
         return (
           <SavedCard key={item.restaurant_id} {...item}/>
         )
      })
      return savedCard
    }

    //enter a date to meet
    /**sets state for datetime */
  // function handleDate(event) {
  //   setDateTime(event.target.value)
  //   moment(dateTime).format("dddd, MMMM Do YYYY, h:mm:ss a")
  // }



    //enter last day to vote

    //confirm button to send invitation

    


  return (
    <div >
        <h1 className={styles.h1} >Create Your Invitation</h1>
        <br></br>

        <input className={styles.button} type='button' onClick={() => alert('Test')} value='Send Invite'/>
        {restaurants && <section className={styles.cardlist} >{display()}</section>}

    </div>
  )
}
