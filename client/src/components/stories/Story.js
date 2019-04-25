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
                            <h1>Your Stories</h1>
                            
                            <ul>
                                {
                                    this.state.stories.map((story) => {
                                        return(
                                            <div key={story._id}>
                                                <div className="card">
                                                    <div className="card-header">
                                                        Stories
                                                    </div>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{story.title}</h5>
                                                        <p className="card-text">{story.body}</p>
                                                        <Link to={`/stories/${story._id}`} className="btn btn-outline-success">Go to story</Link>
                                                    </div>
                                                </div><br/>
                                            </div>
                                            // <li key={story._id}><Link to={`/stories/${story._id}`}>{story.title}</Link></li>
                                        )
                                    })
                                }
                            </ul>
                        </div> 
                    )
                }
                <Link to="/stories/new" className="btn btn-outline-success">Add new Story</Link>
            </div>
        )
    }
}

export default Story