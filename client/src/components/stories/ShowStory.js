import React from 'react'
import axios from 'axios'
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
            axios.delete(`http://localhost:3005/stories/${id}`)
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
        
        axios.get(`http://localhost:3005/stories/${id}`)
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
                <h2>Show Story</h2>
                {
                    // this.state.story.map((story) => {
                    //     return <p key={story._id}>{story.body}</p>
                    // })
                    
                }
                <p>{this.state.story.body}</p>
                <input type="button" value="Delete" onClick={this.handleDelete}/><br/><br/>
                <Link to={`/stories/edit/${this.props.match.params.id}`}>EDIT</Link><br/>
                <Link to="/stories">BACK</Link>
            </div>
        )
    }
}

export default ShowStory