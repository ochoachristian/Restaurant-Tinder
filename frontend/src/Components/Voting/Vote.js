import React from 'react'
import styles from './Vote.module.css'
import SavedCard from '../Invite/SavedCard'
const API_BASE = 'http://localhost:8081/'

export default function Vote() {

    const pathName = window.location.pathname
    const guestId = pathName.substring(7)
    const [restaurants, setRestaurants] = React.useState()

    function testId() {
        console.log(pathName)
        console.log(guestId)
    }

    React.useEffect(() => {
        getRestaurants(guestId)
        }, [])

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
        <h1 className={styles.h1} onClick={() => testId()}>Vote Down Below!</h1>
        {restaurants && <section className={styles.cardlist}>{display()}</section>}
        
    </div>
  )
}
