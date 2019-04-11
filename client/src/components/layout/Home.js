import React from 'react'
import {Link} from 'react-router-dom'

class Home extends React.Component{
    render(){
        const tabs = {
            color: 'grey',
          };
          
        return(
            <div>
                <div className="container">
                    <h1>Medium Clone</h1><br/>
                    <div className="text-center">
                        <Link to="/" style={tabs}>Home</Link> &nbsp; 
                        <Link to="/" style={tabs}>Culture</Link> &nbsp;
                        <Link to="/" style={tabs}>Tech</Link> &nbsp;
                        <Link to="/" style={tabs}>Startups</Link> &nbsp;
                        <Link to="/" style={tabs}>Health</Link>
                    </div>
                    
                    <div>
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