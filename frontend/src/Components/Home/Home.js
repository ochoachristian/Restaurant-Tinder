import {Link} from 'react-router-dom'
import styles from './Home.module.css'

function Home(props) {

    return(
        <div>
            <h1 className={styles.heading}>Welcome to Restaurant Tinder!</h1>
            <div className={styles.infocards}>

            <div className={styles.section}>
                <h2 className={styles.title}>Search</h2>
                <p className={styles.text}>Create an account or login to use our application. Search for the best restaurants in the city provided. 
                Get the top ranking restaurants in the area in order from left to right. Grab the restaurant details via TripAdvisor.
                Get the address, phone number and much more! Save your favorite restaurants to a custom list.
                </p>
                <br></br>
                <input className={styles.button} type='button' onClick={() => alert("Sike!")} value="Search"/>
            </div>

            <div className={styles.section}>
                <h2 className={styles.title}>Invite</h2>
                <p className={styles.text}>Ready to start matchmaking? Create an invitation using your saved list
                 and invite guests to vote for their preferences. Set the meeting date, and the last day to vote. Once the results are in, 
                 you decide where to go based on your guests' votes.
                </p>
                <br></br>
                <input className={styles.invitebutton} type='button' onClick={() => alert("Nope!")} value="Invite"/>
            </div>

            <div className={styles.section}>
                <h2 className={styles.title}>About</h2>
                <p className={styles.text}>This application was built by a team of 5, running on no sleep and lots of caffeine. 
                Help support the devs by offering job opportunites and / or apprenticeships. 
                For just $1 a day, you can help support your local starving developer via the link below.
                </p>
                <br></br>
                <input className={styles.aboutbutton} type='button' onClick={() => alert("Yes!")} value="About"/>
            </div>
            
            </div>
        </div>
    )
}

export default Home;