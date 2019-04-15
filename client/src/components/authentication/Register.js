import React from 'react'
import axios from 'axios';

class Register extends React.Component{
    constructor(){
        super()
        this.state = {
            username: "",
            email: "",
            password: "",
            notice: ""
        }
    }

    // handleName = (e) => {
    //     const name = e.target.value
    //     this.setState(() => ({
    //         username: name
    //     }))
    // }

    // handleEmail = (e) => {
    //     const email = e.target.value
    //     this.setState(() => ({
    //         email
    //     }))
    // }

    // handlePassword = (e)=> {
    //     const password = e.target.value
    //     this.setState(() => ({
    //         password
    //     }))
    // }

    // insted of having diff event handlers we can have only one by using 
    // name attribute in JSX below

    handleChange = (e) => {
        // since we'll be using "e" directly inside the setState we'll be
        // using e.persist
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
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
                this.props.history.push("/login")
                this.setState(() => ({
                    username: "", email: "", password: "",
                    notice: "successfully registered taking you to login screen"
                }))
            })
            .catch((err) => {
                console.log("Some Error", err)
            })
    }

    render(){
        return(
            <div>
                {this.state.notice && <p>{this.state.notice}</p>}
                <h1>Register with us</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        username:
                        <input type= "text" value = {this.state.username} name="username" onChange={this.handleChange}/>
                    </label><br/>
                    <label>
                        email:
                        <input type= "text" value={this.state.email} name="email" onChange={this.handleChange} />
                    </label><br/>
                    <label>
                        password:
                        <input type= "password" value={this.state.password} name="password" onChange={this.handleChange} />
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