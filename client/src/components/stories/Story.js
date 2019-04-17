import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class Story extends React.Component{
    constructor(){
        super()
        this.state = {
            stories: []
        }
    }

    componentDidMount(){
        axios.get("/stories")
            .then((story) => {
                this.setState(() =>( {
                    stories: story.data
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
                    this.state.stories.length == 0 ? (<h2>No Stories found</h2>) : (
                        <div>
                            <h1>This is My Story</h1>
                            <ul>
                                {
                                    this.state.stories.map((story) => {
                                        return(
                                            <li key={story._id}><Link to={`/stories/${story._id}`}>{story.body}</Link></li>
                                        )
                                    })
                                }
                            </ul>
                        </div> 
                    )
                }
                <Link to="/stories/new">Add new Story</Link>
            </div>
        )
    }
}

export default Story