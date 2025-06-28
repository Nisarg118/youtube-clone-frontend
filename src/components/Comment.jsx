import { useEffect, useState } from "react";
import {
  createComment,
  deleteComment,
  getVideoComments,
  updateComment,
} from "../services/api-service/comment/comment";
import Endpoint from "../services/api-service/endpoints";

const Comment = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  async function handleComment() {
    setLoading(true);
    if (!comment.trim()) return;
    try {
      const res = await createComment({
        url: Endpoint.ADD_COMMENT(videoId),
        formData: { content: comment },
      });
      const newArr = [...comments];
      newArr.unshift(res);
      setComments(newArr);
      setComment("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Failed to post comment:", error);
    }
  }

  async function handleDelete(commentId) {
    try {
      setDeleteLoading(true);
      await deleteComment(Endpoint.DELETE_COMMENT(commentId));

      setComments((prev) =>
        prev.filter((comment) => comment._id !== commentId)
      );
      setDeleteLoading(false);
    } catch (error) {
      setDeleteLoading(false);

      console.error("Error while deleting comment:", error);
    }
  }

  async function handleSave(commentId) {
    try {
      await updateComment({
        url: Endpoint.UPDATE_COMMENT(commentId),
        formData: { content: editText },
      });

      setComments((prev) =>
        prev.map((comment) =>
          comment._id === commentId
            ? { ...comment, content: editText }
            : comment
        )
      );

      setEditingId(null);
      setEditText("");
    } catch (error) {
      console.error("Error while saving edited comment:", error);
    }
  }

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await getVideoComments(Endpoint.GET_COMMENTS(videoId));
        setComments(res);
      } catch (error) {
        console.log("Error while fetching comments: ", error);
      }
    }
    fetchComments();
  }, []);
  return (
    <div>
      {/* Comments */}
      <div className="mt-8">
        <div class="flex gap-4 mt-10 items-start w-full max-w-3xl">
          <div class="flex-1">
            <textarea
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              class="w-full border-2 p-1 border-black focus:outline-none resize-y overflow-hidden leading-relaxed"
            />

            <div class="flex items-center justify-between mt-2">
              <div class="flex items-center gap-2">
                <button
                  onClick={() => handleComment()}
                  class="px-5 py-3 text-sm font-medium text-white bg-blue-500 rounded-full "
                >
                  {loading ? "Loading..." : "Comment"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-lg mt-8 font-semibold mb-4">Comments</h2>
        <div className="space-y-4">
          {comments.map((element, i) => (
            <div
              className="flex items-center justify-between w-full my-2"
              key={i}
            >
              <div className="flex items-start gap-3">
                <img
                  src={element.owner?.avatar?.replace(/^http:/, "https:")}
                  onError={(e) => (e.target.src = "/default-avatar.png")}
                  className="w-9 h-9 rounded-full object-cover"
                  alt="User"
                />
                <div>
                  <p className="text-sm font-medium">
                    {element.owner?.username}
                  </p>

                  {editingId === element._id ? (
                    <input
                      className="border-b outline-none w-full text-sm text-gray-800"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                  ) : (
                    <p className="text-sm text-gray-700">{element.content}</p>
                  )}
                </div>
              </div>

              {editingId === element._id ? (
                <div className="flex gap-2">
                  <button
                    className="text-m px-5 py-2 text-white bg-black rounded-lg"
                    onClick={() => {
                      setEditingId(null);
                      setEditText("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-m text-white bg-green-600 px-5 py-2 rounded-lg disabled:opacity-50"
                    disabled={!editText.trim()}
                    onClick={() => handleSave(element._id)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    className="text-m text-white bg-blue-600 px-5 py-2 rounded-lg"
                    onClick={() => {
                      setEditingId(element._id);
                      setEditText(element.content);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-m text-white bg-red-600 px-5 py-2 rounded-lg"
                    onClick={() => handleDelete(element._id)}
                  >
                    {deleteLoading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
