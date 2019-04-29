import React from 'react'
import {Link} from 'react-router-dom'
import axios from '../../config/axios'

class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            stories: []
        }
    }

    componentDidMount(){
        axios.get("/stories/public")
        .then((story) => {
            this.setState(() =>( {
                stories: story.data
            }))
        })
        .catch((err) => {
            console.log(err)
        })
        
    }

    handleBookmark = (storyId) => {
        const fd = {
            bookmarks: storyId
        }

        axios.post("/users/bookmark/register", fd)
            .then((user) => {
                console.log("it worked", user)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    handleFollow = (userId) => {
        console.log("handle follow")
        console.log(userId)

        const ud = {
            following: userId
        }

        axios.post("/users/follow/register", ud)
        .then((user) => {
            console.log("it worked", user)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){
        const tabs = {
            color: 'grey',
          };
        // const headFont = {
        //     fontFamily: "Lucida Console",
        //     fontWeight: "bold"
        // };

        return(
            <div>
                <div className="container">
                    {/* <h1 style={headFont}>Medium Clone</h1><br/> */}
                    <div className="text-center">
                        <Link to="/" style={tabs}>Home</Link> &nbsp; &nbsp;
                        <Link to="/" style={tabs}>Culture</Link> &nbsp; &nbsp;
                        <Link to="/" style={tabs}>Startups</Link> &nbsp; &nbsp;
                        <Link to="/" style={tabs}>Health</Link> &nbsp; &nbsp;
                        <Link to="/" style={tabs}>Tech</Link> &nbsp; &nbsp;
                        <Link to="/" style={tabs}>Design</Link> &nbsp; &nbsp;
                        <Link to="/" style={tabs}>Politics</Link> &nbsp; &nbsp;
                        <Link to="/" style={tabs}>Art</Link> &nbsp; &nbsp;
                        <Link to="/" style={tabs}>Books</Link> &nbsp; &nbsp;
                        <Link to="/" style={tabs}>Fiction</Link> &nbsp;
                    </div>
                    

                    {/* <img style={{width: 1050, height: 500}} src={'https://cathylu25.files.wordpress.com/2015/02/graffiti-art121.jpg'} /> */}
                    <ul>
                        {
                            this.state.stories.map((story) => {
                                return(
                                    <div key={story._id}>
                                        <div className="card">
                                            <div className="card-header">
                                                <Link to={`/stories/public/${story._id}`} >Stories</Link>
                                                <button type="button" className="btn btn-outline-success" onClick={() => {this.handleFollow(story.user)}}>Follow</button>
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title">{story.title}</h5>
                                                <p className="card-text">{story.body}</p>
                                                {/* <Link to={`/stories/${story._id}`} className="btn btn-outline-success">Go to story</Link> */}
                                                {/* <Link className="btn btn-outline-success" onClick={() => {this.handleBookmark(story._id)}}>Bookmark</Link> */}
                                                <button type="button" className="btn btn-outline-success" onClick={() => {this.handleBookmark(story._id)}}>Bookmark</button>
                                            </div>
                                        </div><br/>
                                    </div>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default Home

// FUNCTION COMPONENT

// import React from 'react' 

// const Home = (props) => {
//     return (
//         <div>
//             <h2>Welcome to the blog </h2>
//         </div>
//     )
// }

// export default Home