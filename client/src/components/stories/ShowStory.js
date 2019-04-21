import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class ShowStory extends React.Component{
    constructor(){
        super()
        this.state = {
            story: {}
        }
    }

    handleDelete = () => {
        const id = this.props.match.params.id
        // if you do just confirm without window it'll throw an error
        const confirm = window.confirm("Are u sure ?")
        if(confirm){
            axios.delete(`/stories/${id}`)
                .then((response) => {
                    console.log("deleted")
                    this.props.history.push("/stories")
                })
                .catch((err) => {
                    console.log("err", err)
                })
        }
    }

    componentDidMount = () => {
        const id = this.props.match.params.id
        
        axios.get(`/stories/${id}`)
            .then((response) => {
                this.setState(() => ({
                    story: response.data
                }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render(){
        return(
            <div>
                {
                    // this.state.story.map((story) => {
                    //     return <p key={story._id}>{story.body}</p>
                    // })
                    
                }
                <p>Title - {this.state.story.body}</p>
                <p>Body - {this.state.story.body}</p>
                <p>Topic - {this.state.story.topicName}</p>
                <p>Tags - {this.state.story.tagName}</p>
                <input type="button" value="Delete" onClick={this.handleDelete}/><br/><br/>
                <Link to={`/stories/edit/${this.props.match.params.id}`}>EDIT</Link><br/>
                <Link to="/stories">BACK</Link>
            </div>
        )
    }
}

export default ShowStory