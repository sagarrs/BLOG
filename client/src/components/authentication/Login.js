import React from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            notice: "",
            redirect: false
        }
    }

    // handleEmail = (e) => {
    //     const email = e.target.value
    //     this.setState(() => ({
    //         email
    //     }))
    // }

    // handlePassword = (e) => {
    //     const password = e.target.value
    //     this.setState(() => ({
    //         password
    //     }))
    // }

    handleChange = (e) => {
        e.persist()

        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const formData = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post("http://localhost:3005/users/login", formData)
            .then((response) => {
                console.log("success", response)
                localStorage.setItem("token", response.data.token)
                this.props.handleIsAuthenticated(true)
                this.setState(() => ({
                    redirect: true
                }))
            })
            .catch((err) => {
                console.log("Login Error",err.response.data)
                this.setState(() => ({
                    notice: err.response.data.notice
                }))
            })
    }

    render(){
        if(this.state.redirect){
            return <Redirect to="/stories" />
        }
        return(
            <div>
                <h1>Login here</h1>
                {this.state.notice && <p>{this.state.notice}</p>}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        email:
                        <input type="text" value={this.state.email} name="email" onChange={this.handleChange}/>
                    </label><br/>

                    <label>
                        password:
                        <input type="password" value={this.state.password} name="password" onChange={this.handleChange}/>
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