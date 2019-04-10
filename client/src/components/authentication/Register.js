import React from 'react'
import axios from 'axios';

class Register extends React.Component{
    constructor(){
        super()
        this.state = {
            username: "",
            email: "",
            password: ""
        }
    }

    handleName = (e) => {
        const name = e.target.value
        this.setState(() => ({
            username: name
        }))
    }

    handleEmail = (e) => {
        const email = e.target.value
        this.setState(() => ({
            email
        }))
    }

    handlePassword = (e)=> {
        const password = e.target.value
        this.setState(() => ({
            password
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        
        const formData = {
            username : this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        
        axios.post("http://localhost:3005/users/register", formData)
            .then((user) => {
                console.log("Success", user)
                this.setState(() => ({
                    username: "", email: "", password: ""
                }))
            })
            .catch((err) => {
                console.log("Some Error", err)
            })
    }

    render(){
        return(
            <div>
                <h1>Register with us</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        username:
                        <input type= "text" value = {this.state.username} onChange={this.handleName}/>
                    </label><br/>
                    <label>
                        email:
                        <input type= "text" value={this.state.email} onChange={this.handleEmail} />
                    </label><br/>
                    <label>
                        password:
                        <input type= "password" value={this.state.password} onChange={this.handlePassword} />
                    </label><br/>
                    <label>
                        <input type="Submit" />
                    </label><br/>
                </form>
            </div>
        )
    }
}

export default Register