import { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {addToken, addUser} from '../../Redux/actionCreators'
import {baseUrl} from '../../Shared/baseUrl'
import axios from 'axios'
import styles from './Login.module.css'



const mapDispatchToProps = (dispatch) => ({
    addToken: () =>  dispatch(addToken()),
    addUser: () => dispatch(addUser()) 
});

class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            nonvalid:false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    

    handleLogin = async () => {
        try {
            const data = { username: this.state.username, password: this.state.password };
            

            const userWithToken = await axios.post(baseUrl + '/login', data)

            
            await this.props.dispatch(addToken(userWithToken.data.token))
            await this.props.dispatch(addUser(userWithToken.data.user));
        } catch (error) {
            this.setState(prev => ({...prev, nonvalid:true}))
        }
    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleBlur = (field) => (event) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    render(){
        return(
            <div className={styles.body}>

                <div className={styles.loginsection}>

                        <h1 className={styles.headtext}>Log In</h1>
                        <div className={styles.textprompt}> {this.state.nonvalid && <p>invalid username/password</p>}</div>

                    <div className={styles.userbtn}>
                        <label class="sr-only">Username</label>
                        <input type="text" id="username" name="username" className="form-control" placeholder="Username" v-model="user.username" onChange={this.handleInputChange} required/>
                    </div>

                    <div className={styles.passwordbtn}>
                        <label class="sr-only">Password</label>
                        <input type="password" id="password" name="password" className="form-control" placeholder="Password" v-model="user.password" onChange={this.handleInputChange} required/>
                    </div>

                    <Link className={styles.register} to="/register">Sign Up</Link>
                    <button className={styles.signinbtn} type="submit" onClick={this.handleLogin}>Sign in</button>

                </div>
                
            </div>
        )
    }
}

export default withRouter(connect(mapDispatchToProps)(Login));