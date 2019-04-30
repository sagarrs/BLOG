import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'
import '../../App.css'

class ShowStory extends React.Component{
    constructor(){
        super()
        this.state = {
            story: {}
        }
    }

    handleDelete = (tagName) => {
        const id = this.props.match.params.id

        const tagData = {
            tagName: tagName.toString()
        }
        console.log(tagData)
        console.log(id)
        // if you do just confirm without window it'll throw an error
        const confirm = window.confirm("Are u sure ?")
        if(confirm){
            axios.delete(`/stories/${id}`, { data: { tagName: tagName.toString() } })
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

            axios.get(`/tags`)
            .then((response) => {
                // console.log(response.data)

                const x = response.data.filter(function(subarray) {
                        return subarray.stories.filter(function(story) {
                            return story == id
                        })
                    })
                
                // const result = response.data.map(function(ele){
                //     console.log(ele)
                //     return ele
                // })
                
                // console.log("-------------------------------------")
                // console.log(result)

                //   scores.map(function(subarray) {
                //     return subarray.map(function(number) {
                //       return number * 3;
                //     })
                //   })
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
                <p className="text-info">Title - {this.state.story.title}</p>
                {/* <p>Body - {this.state.story.body}</p>
                <p>Topic - {this.state.story.topicName}</p>
                <p>Tags - {this.state.story.tagName}</p> */}
                <blockquote>
                    <p>{this.state.story.body}</p>
                    <footer className="text-muted">Topic : {this.state.story.topicName}</footer>
                    <footer className="text-muted">Tags - {this.state.story.tagName}</footer>
                </blockquote>
                <div>
                    {/* <img src={this.state.story.previewImageUrl} /> */}
                    <img className="home-img" src={`http://localhost:3005/${this.state.story.previewImageUrl}`} /><br/><br/>
                </div>
                <input type="button" className="btn btn-outline-success" value="Delete" onClick={() => {this.handleDelete(this.state.story.tagName)}}/>&nbsp;&nbsp;
                <Link to={`/stories/edit/${this.props.match.params.id}`} className="btn btn-outline-success" >EDIT</Link><br/><br/>
                <Link to="/stories" className="btn btn-outline-success">BACK</Link>
            </div>
        )
    }
}

export default ShowStory