import React, { useContext } from "react";
import Post from "./Post";
import axios from "axios";
import { AppContext } from "../App";

const Feed = () => {
  const { state } = useContext(AppContext);

  const [responseData, setResponseData] = React.useState("");

  React.useEffect(() => {
    fetchPosts();
  }, [state]);

  const ratingSort = (posts) =>
    posts.sort((a, b) => {
      return b.rating - a.rating;
    });

  const fetchPosts = () => {
    console.log("fetching");
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/posts`,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setResponseData(ratingSort(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <article className="col-8 postFeed-wrapper">
      <div className="row">
        {responseData &&
          responseData.map((post) => <Post data={post} key={post.id} />)}
      </div>
    </article>
  );
};

export default Feed;
