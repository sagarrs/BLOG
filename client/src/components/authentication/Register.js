import React from 'react'
import axios from '../../config/axios';

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
        
        axios.post("/users/register", formData)
            .then((user) => {
                console.log("Success", user)
                this.setState(() => ({
                    username: "", email: "", password: "",
                    notice: "successfully registered taking you to login screen"
                }))
                this.props.history.push("/login")
            })
            .catch((err) => {
                console.log("Some Error", err)
            })
    }

    render(){
        return(
            <div>
                {this.state.notice && <p>{this.state.notice}</p>}
                <div>
                    <div className="container">
                        <div id="login-row" className="row justify-content-center align-items-center">
                            <div id="login-column" className="col-md-6">
                                <div id="login-box" className="col-md-12 card">
                                    <form onSubmit={this.handleSubmit} className="form">
                                        <h3 className="text-center text-success">Register</h3>
                                        <div className="form-group">
                                            <label className="text-success">Username:</label><br/>
                                            <input type= "text" className="form-control" value = {this.state.username} name="username" onChange={this.handleChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label className="text-success">Email:</label><br/>
                                            <input type= "text" className="form-control" value={this.state.email} name="email" onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label className="text-success">Password:</label><br/>
                                            <input type= "password" className="form-control" value={this.state.password} name="password" onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="submit" name="submit" className="btn btn-outline-success" value="submit"/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <form onSubmit={this.handleSubmit}>
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
                </form> */}



            </div>
        )
    }
}

export default Register