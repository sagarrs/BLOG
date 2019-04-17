import React from 'react'
import Form from './Form'
import axios from '../../config/axios'

class NewStory extends React.Component{
    constructor(){
        super()
        this.state = {

        }
    }

    handleSubmit = (formData) => {

        axios.post("/stories", formData)
        .then((response) => {
            console.log("success")
            console.log(response.data)
            this.props.history.push("/stories")
        })
        .catch((err) => {
            console.log("smasye ide", err)
        })

    }   

    render(){
        return(
            <div>
                <h1>New Stories</h1>
                <Form handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default NewStory