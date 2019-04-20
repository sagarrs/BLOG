import React from 'react'
import axios from 'axios'
import Select from 'react-select'

class Form extends React.Component{
    constructor(props){
        // console.log(props.story)
        super(props)
        this.state = {
            // the below is not needed coz we r using "componentWillReceiveProps"
            // it'll be needed only if we make use of isLoaded in "edit.js"
            // title: props.story ? props.story.title : "",
            // body: props.story ? props.story.body : ""
            title: "",
            body: "",
            topicName: "",
            tagName: ""
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

    handleTopic = (e) => {
       console.log("inside topic")
       const topicName = e.value
       this.setState(() => ({
            topicName
       }))
    }

    handleTags = (e) => {
        const tags = e.map((tag) => {
            return tag.value
        }) 
        this.setState(() => ({
            tagName: tags
        }))
     }

    componentWillReceiveProps(nextProps){
        console.log("nextProps", nextProps)
        this.setState(() => ({
            title: nextProps.story.title,
            body: nextProps.story.body,
            topicName: nextProps.story.topicName,
            tagName: nextProps.story.tagName
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        
        const formData = {
            title: this.state.title,
            body: this.state.body,
            topicName: this.state.topicName,
            tagName: this.state.tagName
        }

        const topicData = {
            topicName: this.state.topicName
        }

        const tagData = {
            tagName: this.state.tagName
        }
        
        // the handle submit of new story is in "this.props" coz we r passing as
        // "props" from new story "<Form handleSubmit={this.handleSubmit}/>"
        // here we r passing "formData as args for handleSubmit" which calls the
        // handleSubmit in the new story

        // console.log(formData)
        this.props.handleSubmit(formData, topicData, tagData)
    }

    render(){
        const options = [
            { value: 'react', label: 'React' },
            { value: 'vue', label: 'Vue' },
            { value: 'angular', label: 'Angular' }
          ]
        return(
            <div>
                <h1>Form</h1>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Title: 
                        <input type="text" className="form-control" value={this.state.title} onChange={this.handleTitle}/>
                    </label><br/>

                    <label>
                        Body: 
                        {/* <input type="text" value={this.state.body} onChange={this.handleBody} /> */}
                        <textarea value={this.state.body} className="form-control" rows="5" onChange={this.handleBody}></textarea>
                    </label><br/>

                    <div> 
                        Topics:
                        <Select options={options} onChange={this.handleTopic}/>
                    </div><br/>

                    <div> 
                        Tags:
                        <Select
                            // defaultValue={[options[2], options[3]]}
                            isMulti
                            name="colors"
                            options={options}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={this.handleTags}
                        />
                    </div><br/>

                    <label>
                        <input type="Submit" className="btn btn-outline-success"/>
                    </label>
                </form>
            </div>
        )
    }
}

export default Form