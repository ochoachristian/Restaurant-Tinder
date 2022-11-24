import React from 'react'
import styles from './Finalists.module.css'
import axios from 'axios'
import SavedCard from '../Invite/SavedCard'
import FinalCards from './FinalCards'
import {useSelector} from 'react-redux'

const API_BASE = 'http://localhost:8081/'

export default function Finalists() {

  const [restaurants, setRestaurants] = React.useState()
  const hostId = useSelector((state) => state.user.id)

  React.useEffect(() => {
    getFinalists()
    }, [])

  async function getInvitationId() {
    const invitationId = await axios.get(API_BASE + "invitations/" + hostId);
    //console.log(invitationId.data)
    
    return invitationId.data 
 }

  async function getFinalists() {
    const invitationId = await getInvitationId()
    const data = await axios.get(API_BASE + "restaurants/finalists/" + invitationId);
    const finalists = data.data
    console.log(data)
    console.log(finalists)
    setRestaurants(finalists)
    //console.log(invitationId)
  }

   /**displays restaurants */
   function display() {

    const savedCard = restaurants.map(item => {
        return (
            <FinalCards key={item.restaurant_id} {...item}/>
          // console.log(item)
        )
    })
    return savedCard
    }

  return (
    <div>
      <h1 className={styles.h1} onClick={() => getFinalists()}>Finalists</h1>
      {restaurants && <section className={styles.cardlist}>{display()}</section>}

    </div>
  )
}
