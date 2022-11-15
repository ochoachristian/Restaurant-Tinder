import React from 'react'
import {Link} from 'react-router-dom'
import { baseUrl } from '../../Shared/baseUrl'
import styles from './Register.module.css'

export default function Register() {
   
    const [state, setState] = React.useState({
        username:'',
        password:'',
        confirmPassword:''
    })

    function checkStrength(string) {
        
        let a = /[A-Z]/.test(string) //.test returns true if regex is found in string; else false
        let b =/[a-z]/.test(string) 
        let c = /\d/.test(string)  
        let d = string.length >= 8 
       // console.log(a && b && c && d)
        return (a && b && c && d)
    }
   
    function handleInputChange(event) {
        event.preventDefault()
        setState((prevState) => {
            return {
               ...prevState, [event.target.name]: event.target.value
            }
        })
    }

    function handleSubmit() {
        
        const data = { //using this to POST
            username: state.username,
            password: state.password,
            confirmPassword: state.confirmPassword,
            role: 'USER'
        } 
        console.log(data)

        if( (state.username.startsWith('@')  || !/@/.test(state.username)) || !/\./.test(state.username)){
            alert('Needs to be an email')
            return
        }

        if(state.password !== state.confirmPassword) {

            alert("Password and Confirm Password must match!")
            console.log(state)

        } else {

            if (!checkStrength(state.password)) { //if the password does not match the criteria
                alert('Must have one lowercase letter, one uppercase, one number, and be 8 characters minimum')

            } else { //password meets criteria, POST to database

                fetch(baseUrl + '/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                .then(response => {
                    if (response.status === 400) { 
                        alert('Account already exists.')
                    } else {
                        alert("Account created successfully!")
                        console.log(response.status, JSON.stringify(data))
                    }
                })
            } 
        }
    }

    return(
        <div className={styles.container}>

            <div className={styles.registersection}>

                <h1 className={styles.h1}>Create Account</h1>
                

                <label class="sr-only">Username</label>
                <input className={styles.input}
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    v-model="user.username"
                    onChange={(e) => handleInputChange(e)}
                    required
                />
                <label class="sr-only">Password</label>
                <input className={styles.input}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    v-model="user.password"
                    onChange={(e) => handleInputChange(e)}
                    required
                />
                <input className={styles.input}
                    type="password"
                    id="password-confirm"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    v-model="user.password"
                    onChange={(e) => handleInputChange(e)}
                    required
                />
                <Link to="/login">Have an account?</Link>
                <button className={styles.button} type="submit" onClick={() => handleSubmit()}>Sign Up</button>

            </div>
        </div>
    )
}