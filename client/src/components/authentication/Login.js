import React from 'react'
import axios from 'axios'

class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            email: "",
            password: ""
        }
    }

    handleEmail = (e) => {
        const email = e.target.value
        this.setState(() => ({
            email
        }))
    }

    handlePassword = (e) => {
        const password = e.target.value
        this.setState(() => ({
            password
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const formData = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post("http://localhost:3005/users/login", formData)
            .then((user) => {
                console.log("success", user)
            })
            .catch((err) => {
                console.log("Login Error",err)
            })
    }

    render(){
        return(
            <div>
                <h1>Login here</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        email:
                        <input type="text" value={this.state.email} onChange={this.handleEmail}/>
                    </label><br/>

                    <label>
                        password:
                        <input type="password" value={this.state.password} onChange={this.handlePassword}/>
                    </label><br/>

                    <label>
                        <input type="submit" />
                    </label>
                </form>
            </div>
        )
    }
}

export default Login