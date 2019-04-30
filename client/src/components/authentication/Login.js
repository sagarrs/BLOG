import React from 'react'
import axios from '../../config/axios'
import {Redirect} from 'react-router-dom'

import "../../App.css"

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

        axios.post("/users/login", formData)
            .then((response) => {
                console.log("success", response)
                // below explanation is in book [pg-10] end
                axios.defaults.headers['x-auth'] = response.data.token
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
                {this.state.notice && <p>{this.state.notice}</p>}
                <div>
                    <div className="container">
                        <div id="login-row" className="row justify-content-center align-items-center">
                            <div id="login-column" className="col-md-6">
                                <div id="login-box" className="col-md-12 card">
                                    <form onSubmit={this.handleSubmit} className="form">
                                        <h3 className="text-center text-success">Login</h3>
                                        <div className="form-group">
                                            <label className="text-success">Email:</label><br/>
                                            <input type="text" className="form-control" value={this.state.email} name="email" onChange={this.handleChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label className="text-success">Password:</label><br/>
                                            <input type="password" className="form-control" value={this.state.password} name="password" onChange={this.handleChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label className="text-success">
                                                <span>Remember me</span> <span>
                                                    <input id="remember-me" name="remember-me" type="checkbox"/>
                                                </span>
                                            </label><br/>
                                            <input type="submit" name="submit" className="btn btn-outline-success" value="submit"/>
                                        </div>
                                        {/* <div id="register-link" className="text-right">
                                            <a href="/" className="btn btn-outline-success">Register here</a>
                                        </div> */}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* <form onSubmit={this.handleSubmit}>
                    <label>
                        email:
                        <input type="text" className="form-control" value={this.state.email} name="email" onChange={this.handleChange}/>
                    </label><br/>
                    
                    <label className="text-success">Email:
                        <input type="text" className="form-control" value={this.state.email} name="email" onChange={this.handleChange}/>
                    </label><br/> 

                    <label className="text-success">
                        Password:
                        <input type="password" className="form-control" value={this.state.password} name="password" onChange={this.handleChange}/>
                    </label><br/>

                    <label>
                        <input type="submit" className="btn btn-outline-success" />
                    </label>
                </form> */}

            </div>
        )
    }
}

export default Login