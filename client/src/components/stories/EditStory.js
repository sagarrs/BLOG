import React from 'react'
import axios from 'axios'
import Form from './Form'

class EditStory extends React.Component{
    constructor(){
        super()
        this.state = {
            story: {},
            // isLoaded: false
        }
    }

    componentDidMount = () => {
        const id = this.props.match.params.id
        axios.get(`http://localhost:3005/stories/${id}`)
            .then((response) => {
                this.setState(() => ({
                    story: response.data,
                    isLoaded: true
                }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    handleSubmit = (formData) => {
        axios.put(`http://localhost:3005/stories/${this.state.story._id}`, formData)
            .then((response) => {
                this.props.history.push(`/stories/${this.state.story._id}`)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render(){
        return(
            <div>
                <h3>Edit</h3>
                {/* {
                    this.state.isLoaded && <Form story={this.state.story} handleSubmit={this.handleSubmit}/>
                } */}
                <Form story={this.state.story} handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default EditStory