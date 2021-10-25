import React from 'react';
import axios from 'axios';

const Post = (props) => {

    const [post, setPost] = React.useState({
        id: props.data.id,
        username: props.data.username,
        title: props.data.title,
        content: props.data.content,
        rating: props.data.rating
    })

    const handleVote = mode => {
        console.log(`this runs ${mode}`)
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/posts/vote/${mode}/${post.id}`,          
        }).then((response) => {
            console.log(response)
            setPost({
                id: props.data.id,
                username: props.data.username,
                title: props.data.title,
                content: props.data.content,
                rating: response.data.rating
            })
        }).catch((error) => {
            console.log(error)
        })
    }

	return (
        <section className="post-wrapper card my-3 p-3 col-12">
            <header className="border-bottom mb-3">
                <h1 className="h4 text-muted">{post.username}<small> says</small></h1>
            </header>
            <h2>{post.title}</h2>
            <div className="copy">
                <p>{post.content}</p>
            </div>
            <div className="rating d-flex">
                <button className="mr-2 btn-voting upvote" onClick={() => handleVote("up")}>&#x25B2;</button>{post.rating}<button className="ml-2 btn-voting dowwnvote" onClick={() => handleVote("down")}>&#x25BC;</button>
            </div>
        </section>
	);
};

export default Post