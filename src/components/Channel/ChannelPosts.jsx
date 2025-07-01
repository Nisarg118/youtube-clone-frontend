import { useEffect, useState } from "react";
import {
  createTweet,
  deleteTweet,
  getUserTweets,
  updateTweet,
} from "../../services/api-service/Tweet/tweet";
import Endpoint from "../../services/api-service/endpoints";
import { currentUser } from "../../services/api-service/user/user";
import { useOutletContext } from "react-router-dom";
import TweetCard from "../Cards/TweetCard";

const ChannelPosts = () => {
  const { userId } = useOutletContext();
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    async function fetchUserId() {
      try {
        const res = await currentUser(Endpoint.CURRENT_USER);
        setId(res._id);
      } catch (error) {
        console.log("Error while fetching userId ", error);
      }
    }
    fetchUserId();
  }, []);

  useEffect(() => {
    async function fetchUserTweets() {
      try {
        const res = await getUserTweets(Endpoint.GET_USER_TWEETS(userId));
        setTweets(res);
      } catch (error) {
        console.log("Error while fetching user tweets ", error);
      }
    }
    fetchUserTweets();
  }, []);

  async function handleAddPost() {
    try {
      const res = await createTweet({
        url: Endpoint.CREATE_TWEET,
        formData: { content: tweet },
      });
      const newArr = [...tweets];
      newArr.unshift(res);
      setTweets(newArr);
      setTweet("");
    } catch (error) {
      console.log("Error while creating tweet ", error);
    }
  }

  async function handleDelete(tweetId) {
    try {
      await deleteTweet(Endpoint.DELETE_TWEET(tweetId));
      const newArr = tweets.filter((element) => element._id !== tweetId);
      setTweets(newArr);
    } catch (error) {
      console.log("Error while deleting tweet ", error);
    }
  }

  async function handleEdit(tweetId, newContent) {
    try {
      const res = await updateTweet({
        url: Endpoint.UPDATE_TWEET(tweetId),
        formData: { content: newContent },
      });
      const newArr = tweets.map((t) =>
        t._id === tweetId ? { ...t, content: res.content } : t
      );
      setTweets(newArr);
    } catch (error) {
      console.log("Error while editing tweet", error);
    }
  }
  return (
    <div>
      {id === userId && (
        <div className="border-b p-4">
          <textarea
            rows={3}
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            className="w-full h-35 resize-none border border-gray-400 rounded-md p-2 text-m focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write something..."
          ></textarea>
          <button
            onClick={() => handleAddPost()}
            className="mt-5 bg-black text-white px-5 py-2 rounded-lg text-m hover:bg-gray-300 hover:text-black"
          >
            Post
          </button>
        </div>
      )}

      {tweets.length === 0 && <h1>No posts yet</h1>}

      {tweets.map((tweet) => (
        <div key={tweet._id}>
          <TweetCard
            id={id}
            userId={userId}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            tweet={tweet}
          />
        </div>
      ))}
    </div>
  );
};

export default ChannelPosts;
