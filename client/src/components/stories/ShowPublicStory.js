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
            data: ""
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
    }

    handleBody = ( ( event, editor ) => {
        console.log("body")
        const data = editor.getData();
        this.setState(() => ({
            data: data
        }))

    } )

    handleSubmit = (id) => {
        // e.preventDefault()
        const formData = {
            data: this.state.data,
            id: id
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
        console.log(this.state.story.responses)
        return(
            <div>
                <p>Title - {this.state.story.body}</p>
                <p>Body - {this.state.story.body}</p>
                <p>Topic - {this.state.story.topicName}</p>
                <p>Tags - {this.state.story.tagName}</p>
                
                {/* Comments = {this.state.story.responses && this.state.story.responses.map(response => <p key={response._id}>{response.body}</p> )} */}
                <div>
                    <img style={{width: 850, height: 400}} src={`http://localhost:3005/${this.state.story.previewImageUrl}`} /><br/>
                </div>

                <div>
                    <form>
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

                        <input type="button" className="btn btn-outline-success" value="submit" onClick={() => {this.handleSubmit(this.state.story._id)}}/><br/><br/>
                    </form>
                </div>
                
                <div>
                    {this.state.story.responses && this.state.story.responses.map(response => 
                        <div key={response._id}>
                            <div className="card" style={{width: 850}}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <img src="https://image.ibb.co/jw55Ex/def_face.jpg" className="img img-rounded img-fluid"/>
                                        </div>
                                        <div className="col-md-10">
                                            <p>
                                                <a className="float-left" href="https://maniruzzaman-akash.blogspot.com/p/contact.html"><strong>Maniruzzaman Akash</strong></a>
                                                <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                                <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                                <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                                <span className="float-right"><i className="text-warning fa fa-star"></i></span>

                                        </p>
                                        <div className="clearfix"></div>
                                            <p key={response._id}>{response.body}</p>
                                            <p>
                                                <a className="float-right btn btn-outline-primary ml-2"> <i className="fa fa-reply"></i> Reply</a>
                                                <a className="float-right btn text-white btn-danger"> <i className="fa fa-heart"></i> Like</a>
                                        </p>
                                        </div>
                                    </div>
                                </div>
                            </div><br/>
                        </div> 
                    )}
                </div>
                <Link to="/" className="btn btn-outline-success">BACK</Link><br/><br/>
            </div>
        )
    }
}

export default ShowStory