import { useState } from "react";

const TweetCard = ({ id, userId, handleDelete, handleEdit, tweet }) => {
  const [liked, setLiked] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(tweet.content);

  const toggleLike = () => setLiked((prev) => !prev);

  return (
    <div className="border p-3 rounded-lg mt-4">
      <div className="w-full border border-gray-300 rounded-xl p-4 shadow-sm mb-4">
        {/* Tweet content */}
        {editing ? (
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full border p-2 rounded-md resize-none mb-2"
            rows={3}
          />
        ) : (
          <p className="text-gray-800 text-base mb-3 whitespace-pre-wrap">
            {tweet.content}
          </p>
        )}

        {/* Bottom section */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <button
            onClick={toggleLike}
            className={`text-m ${liked ? "text-red-500" : "text-gray-500"}`}
          >
            Like
          </button>
          <span className="text-xs">
            {new Date(tweet.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      {id === userId && (
        <div className="flex gap-5">
          {editing ? (
            <>
              <button
                className="bg-green-500 hover:bg-green-700 px-5 py-2 rounded-lg text-white"
                onClick={() => {
                  handleEdit(tweet._id, editContent);
                  setEditing(false);
                }}
              >
                Save
              </button>
              <button
                className="bg-gray-400 px-5 py-2 rounded-lg hover:bg-gray-600 text-white"
                onClick={() => {
                  setEditContent(tweet.content);
                  setEditing(false);
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-blue-400 hover:bg-blue-800 px-5 py-2 rounded-lg text-white"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(tweet._id)}
                className="bg-red-500 px-5 py-2 rounded-lg hover:bg-red-800 text-white"
              >
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TweetCard;
