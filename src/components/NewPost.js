import axios from 'axios';
import React, { useContext } from 'react';
import { AppContext } from '../App'

const NewPost = (props) => {

    const {dispatch} = useContext(AppContext);

    const [post, setPost] = React.useState({
        username: '',
        title: '',
        content: ''
    })

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        post[name] = value;
        setPost(post);
      };

    const handleSubmit = e => {
        e.preventDefault();
        
        const requestData = {
            username: post.username,
            title: post.title,
            content: post.content,
        }
        
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/posts`,
            data: requestData,
            headers: {
                "Content-Type": "application/json",
            },            
        }).then((response) => {            
            // Reset the state
            setPost({
                username: '',
                title: '',
                content: ''
            })
            
            // Reset the form
            e.target.reset();
            
            dispatch({ type: 'UPDATE_POSTS', data: true});
        }).catch((error) => {
            console.log(error)
        })
    }

	return (
        <article className="newPost-wrapper card p-3 mb-5 col-9 d-flex flex-column align-items-center">
            <h1 className="h2 mb-3 text-center w-100" >Add a new post!</h1>
            <form method="POST" className="row justify-content-between" onSubmit={handleSubmit}>
                <input className="col-4 mb-2" name="username" type="text" placeholder="Username" onChange={handleChange}></input>
                <input className="col-7 mb-2" name="title" type="text" placeholder="Title" onChange={handleChange}></input>
                <textarea className="col-12 mb-5" name="content" type="text" placeholder="Content" onChange={handleChange}></textarea>
                <button className="btn btn-primary m-auto" type="submit">Add post</button>
            </form>
        </article>
	);
};

export default NewPost