import {Component} from 'react'
import {Switch, Route, Redirect, Link} from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Home from '../Home/Home'
import {addToken, deleteUser} from '../../Redux/actionCreators'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Search from '../Search/Search'
import Invite from '../Invite/Invite'
import Vote from '../Voting/Vote'
import styles from './Main.module.css'
import image from '../../Images/Logo.jpg'

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    addToken: () => { dispatch(addToken()) },
    deleteUser: () => { dispatch(deleteUser())}
});

class Main extends Component {
    constructor(props){
        super(props);
    }

    handleLogout = () => {
        this.props.addToken("")
        this.props.deleteUser()
    }

    render(){
        return(
            <div>
                
                {this.props.token.token !== undefined ?

                    <div className={styles.nav}>

                        <img src={image} alt='image' className={styles.image} />
                        <h1 className={styles.title}>Restaurant Tinder</h1>

                        <div className={styles.links}>
                            <Link className={styles.link} to='/home'>Home</Link>
                            <Link className={styles.link} to='/search'>Search</Link>
                            <Link className={styles.link} to='/invite'>Invite</Link>

                            <Link className={styles.link}to='/login' onClick={this.handleLogout}>Logout</Link> 
                            <Redirect to='/invite'/> 
                        </div>

                     </div>  

                    : 
                    <div className={styles.nav}>
                        <img src={image} className={styles.image} />
                        <h1 className={styles.title}>Restaurant Tinder</h1>

                        <div className={styles.links}>
                            <Link className={styles.link} to='/home'>Home</Link>
                            <Link className={styles.link} to='/login'>Login</Link>
                        </div>
                    </div>

                }
                <Switch>
                    <Route path='/login' component={() => <Login/>}/>
                    <Route path='/register'component={() => <Register/>}/>
                    <Route path='/search' component={() => <Search/>}/>
                    <Route path='/invite' component={() => <Invite/>}/>
                    <Route path='/home' component={() => <Home/>}/>
                    <Route path='/guest/:id' component={() => <Vote/>}/>
                    {/* <Route path='/home' component={this.props.token.token !== undefined ? () => <Home/> : null}/> */}
                     <Redirect to='/home'/> 
                </Switch>
            </div>
        )
    }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));