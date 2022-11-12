import {Link} from 'react-router-dom'
import styles from './Home.module.css'
import {useSelector} from 'react-redux'

function Home() {
    const userId = useSelector((state) => state.user.id)

    return(
        <div className={styles.container}>
           <h1 className={styles.title}>Going out to Eat?</h1>

           <p className={styles.text}>
            Let Restaurant Tinder do the hard work for you! Search for the best restaurants in 
            your city, or any city. See the top restaurants from left to right, save your choices to a list.
            When you're ready, create your invitation and send your guests a link.  
            <em className={styles.em}> Thats it!</em> Let your guests vote for their preferences.
            Then when it's time, you select the restaurant with the most votes and resend your invitation.
            <em className={styles.em}> Going out has never been easier!</em> 
           </p>

           <h2 className={styles.h2}>Ready to get started?</h2>
           {userId ? <Link className={styles.link} to='/search'>Search Now</Link> : <Link className={styles.link} to='/login'>Login</Link>}
            
            
        </div>
    )
}

export default Home;