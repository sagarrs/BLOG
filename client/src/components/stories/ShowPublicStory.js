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

    componentDidMount = () => {
        const id = this.props.match.params.id
        console.log(id)
        axios.get(`/stories/public/${id}`)
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
        console.log(this.state.story)
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
                <div>
                    <img src={this.state.story.previewImageUrl} />
                </div>
                <Link to="/">BACK</Link>
            </div>
        )
    }
}

export default ShowStory