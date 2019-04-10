import React from 'react'
import axios from 'axios'

class Story extends React.Component{
    constructor(){
        super()
        this.state = {
            stories: []
        }
    }

    componentDidMount(){
        axios.get("http://localhost:3005/stories")
            .then((story) => {
                console.log(story.data)
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
                <h1>This is My Story</h1>
                <ul>
                    {
                        this.state.stories.map((story) => {
                            return(
                                <li key={story._id}>{story.body}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Story