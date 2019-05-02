import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class ShowStory extends React.Component{
    constructor(){
        super()
        this.state = {
            story: {},
            data: "",
            responses: []
        }
    }

    componentDidMount = () => {
        const id = this.props.match.params.id
        axios.get(`/stories/public/${id}`)
            .then((response) => {
                this.setState(() => ({
                    story: response.data
                }))
            })
            .catch((err) => {
                console.log(err)
            })
        
        axios.get(`/response`)
            .then((response) => {
                this.setState(() => ({
                    responses: response.data
                }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    handleBody = ( ( event, editor ) => {
        console.log("body")
        const data = editor.getData();
        this.setState(() => ({
            data: data
        }))

    } )

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            data: this.state.data
        }
        console.log(formData)

        axios.post("/response", formData)
            .then((response) => {
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
        
    }

    render(){
        return(
            <div>
                <p>Title - {this.state.story.body}</p>
                <p>Body - {this.state.story.body}</p>
                <p>Topic - {this.state.story.topicName}</p>
                <p>Tags - {this.state.story.tagName}</p>
                <div>
                    <img style={{width: 850, height: 400}} src={`http://localhost:3005/${this.state.story.previewImageUrl}`} /><br/>
                </div>

                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Responses: 
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

                        <input type="Submit" className="btn btn-outline-success"/><br/><br/>
                    </form>
                </div>
                
                <div>

                    {this.state.responses.map((response) => {return (
                        <div>
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-2">
                                            <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid"/>
                                        </div>
                                        <div class="col-md-10">
                                            <p>
                                                <a class="float-left" href="https://maniruzzaman-akash.blogspot.com/p/contact.html"><strong>Maniruzzaman Akash</strong></a>
                                                <span class="float-right"><i class="text-warning fa fa-star"></i></span>
                                                <span class="float-right"><i class="text-warning fa fa-star"></i></span>
                                                <span class="float-right"><i class="text-warning fa fa-star"></i></span>
                                                <span class="float-right"><i class="text-warning fa fa-star"></i></span>

                                        </p>
                                        <div class="clearfix"></div>
                                            <p key={response._id}>{response.body}</p>
                                            <p>
                                                <a class="float-right btn btn-outline-primary ml-2"> <i class="fa fa-reply"></i> Reply</a>
                                                <a class="float-right btn text-white btn-danger"> <i class="fa fa-heart"></i> Like</a>
                                        </p>
                                        </div>
                                    </div>
                                </div>
                            </div><br/>
                        </div>
                    )})}
                </div>
                <Link to="/" className="btn btn-outline-success">BACK</Link><br/><br/>
            </div>
        )
    }
}

export default ShowStory