import React from 'react'
import {Link} from 'react-router-dom'

class Home extends React.Component{
    render(){
        const tabs = {
            color: 'grey',
          };
        const headFont = {
            fontFamily: "Lucida Console",
            fontWeight: "bold"
        };

        return(
            <div>
                <div className="container">
                    <h1 style={headFont}>Medium Clone</h1><br/>
                    <div className="text-center">
                        <Link to="/" style={tabs}>Home</Link> &nbsp; 
                        <Link to="/" style={tabs}>Culture</Link> &nbsp;
                        <Link to="/" style={tabs}>Tech</Link> &nbsp;
                        <Link to="/" style={tabs}>Startups</Link> &nbsp;
                        <Link to="/" style={tabs}>Health</Link>
                    </div>
                    
                    <div className="row" style={{padding: 20}}>
                        <div className="text-center">
                            <img style={{width: 1050, height: 500}} src={'https://cathylu25.files.wordpress.com/2015/02/graffiti-art121.jpg'} />
                        </div>
                    </div>
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