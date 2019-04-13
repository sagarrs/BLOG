import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class ShowStory extends React.Component{
    constructor(){
        super()
        this.state = {
            story: []
        }
    }

    componentDidMount = () => {
        const id = this.props.match.params.id
        
        axios.get(`http://localhost:3005/stories/${id}`)
            .then((response) => {
                console.log(response.data)
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
                    this.state.story.map((story) => {
                        return <p key={story._id}>{story.body}</p>
                    })
                }
                <Link to="/stories">BACK</Link>
            </div>
        )
    }
}

export default ShowStory