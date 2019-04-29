import React from 'react'
import axios from 'axios'
import Select from 'react-select'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
            tagName: "",
            previewImageUrl: null
        }
    }

    handleTitle = (e) => {
        const title = e.target.value
        this.setState(() => ({
            title
        }))
    }

    // handleBody = (value) => {
    //     console.log("body")
    //     console.log(value)
    //     // const body = e.target.value
        // this.setState(() => ({
        //     body
        // }))
    // } 

   handleBody = ( ( event, editor ) => {
        console.log("body")
        const data = editor.getData()
        console.log(data)
        this.setState(() => ({
            body: data
        }))
    } )

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

    handleFile = (e) => {
        // console.log(e.target.files[0])
        this.setState({previewImageUrl:e.target.files[0]})
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        
        // const formData = {
        //     title: this.state.title,
        //     body: this.state.body,
        //     topicName: this.state.topicName,
        //     tagName: this.state.tagName
        // }

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

        var formData = new FormData()
        formData.append('title', this.state.title)
        formData.append('body', this.state.body)
        formData.append('topicName', this.state.topicName)
        formData.append('tagName', this.state.tagName)
        formData.append('previewImageUrl', this.state.previewImageUrl, this.state.previewImageUrl.name)
        
        console.log(formData.get("body"))
        // this.props.handleSubmit(formData, topicData, tagData)
    }

    render(){
        const options = [
            { value: 'home', label: 'Home' },
            { value: 'culture', label: 'Culture' },
            { value: 'startup', label: 'Startup' },
            { value: 'health', label: 'Health' },
            { value: 'tech', label: 'Tech' },
            { value: 'design', label: 'Design' },
            { value: 'politics', label: 'Politics' },
            { value: 'art', label: 'Art' },
            { value: 'books', label: 'Books' },
            { value: 'fiction', label: 'Fiction' }
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
                        {/* <textarea value={this.state.body} className="form-control" rows="5" onChange={this.handleBody}></textarea> */}
                        <CKEditor
                            editor={ ClassicEditor }
                            data={this.state.body}
                            onInit={ editor => {
                                // You can store the "editor" and use when it is needed.
                                // console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={this.handleBody}
                            onBlur={ editor => {
                                // console.log( 'Blur.', editor );
                            } }
                            onFocus={ editor => {
                                // console.log( 'Focus.', editor );
                            } }
                        />
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
                    
                    <div> 
                        Image
                        <input type="file" name="previewImageUrl" onChange={this.handleFile}/>
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