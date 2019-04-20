import React from 'react'
import Form from './Form'
import axios from '../../config/axios'

class NewStory extends React.Component{
    constructor(){
        super()
        this.state = {

        }
    }

    handleSubmit = (formData , topicData, tagData) => {

        axios.post("/tags", tagData)
        .then((response) => {
            console.log("tags", response.data)
            // console.log(response.data)
        })
        .catch((err) => {
            console.log("topics alli smasye ide", err)
        })
        
        axios.post("/stories", formData)
            .then((response) => {
                console.log("success stories")
                console.log(response.data)
                this.props.history.push("/stories")
            })
            .catch((err) => {
                console.log("smasye ide", err)
            })

        axios.post("/topics", topicData)
            .then((response) => {
                console.log("topics", response.data)
                // console.log(response.data)
            })
            .catch((err) => {
                console.log("topics alli smasye ide", err)
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