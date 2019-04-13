import React from 'react'
import axios from 'axios'

class Form extends React.Component{
    constructor(){
        super()
        this.state = {
            title: "",
            body: ""
        }
    }

    handleTitle = (e) => {
        const title = e.target.value
        this.setState(() => ({
            title
        }))
    }

    handleBody = (e) => {
        const body = e.target.value
        this.setState(() => ({
            body
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        
        const formData = {
            title: this.state.title,
            body: this.state.body
        }

        // the handle submit of new story is in "this.props" coz we r passing as
        // "props" from new story "<Form handleSubmit={this.handleSubmit}/>"
        // here we r passing "formData as args for handleSubmit" which calls the
        // handleSubmit in the new story
        this.props.handleSubmit(formData)
    }

    render(){
        return(
            <div>
                <h1>Form</h1>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Title: 
                        <input type="text" value={this.state.title} onChange={this.handleTitle}/>
                    </label><br/>

                    <label>
                        Body: 
                        <input type="text" value={this.state.body} onChange={this.handleBody} />
                    </label><br/>
                    <label>
                        <input type="Submit" />
                    </label>
                </form>
            </div>
        )
    }
}

export default Form