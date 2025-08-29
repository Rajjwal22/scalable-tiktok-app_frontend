import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE, MEDIA_BASE } from "../config";

export default function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE}/videos`)
      .then((res) => {
        const v = res.data.find((vid) => vid._id === id);
        setVideo(v);
      })
      .catch((err) => console.error(err));

    axios
      .get(`${API_BASE}/comments/${id}`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error(err));

    axios
      .get(`${API_BASE}/ratings/${id}`)
      .then((res) => {
        if (res.data.length > 0) {
          const avg = res.data.reduce((a, b) => a + b.stars, 0) / res.data.length;
          setRating(avg.toFixed(1));
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleComment = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first");

    try {
      await axios.post(
        `${API_BASE}/comments/${id}`,
        { text: newComment },
        { headers: { Authorization: token } }
      );
      setComments([{ text: newComment, userId: "You" }, ...comments]);
      setNewComment("");
    } catch {
      alert("Error posting comment");
    }
  };

  const handleRating = async (stars) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first");

    try {
      await axios.post(
        `${API_BASE}/ratings/${id}`,
        { stars },
        { headers: { Authorization: token } }
      );
      setRating(stars);
    } catch {
      alert("Error posting rating");
    }
  };

  if (!video) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
      <h2 className="text-2xl font-bold mb-3">{video.title}</h2>

      <video
        className="w-full rounded-lg mb-4 shadow-md"
        controls
        src={`${MEDIA_BASE}${video.videoUrl}`}
      />

      <div className="space-y-1 text-gray-700 mb-4">
        <p><b>Publisher:</b> {video.publisher}</p>
        <p><b>Producer:</b> {video.producer}</p>
        <p><b>Genre:</b> {video.genre}</p>
        <p><b>Age Rating:</b> {video.ageRating}</p>
      </div>

      <p className="text-yellow-500 text-lg mb-4">⭐ Average Rating: {rating || "No rating yet"}</p>

      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`text-xl ${star <= rating ? "text-yellow-500" : "text-gray-400"}`}
            onClick={() => handleRating(star)}
          >
            ★
          </button>
        ))}
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Comments:</h3>
        <div className="space-y-2 mb-4">
          {comments.length === 0 && <p className="text-gray-500">No comments yet.</p>}
          {comments.map((c, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded-lg">
              <p className="text-gray-700"><b>{c.userId || "User"}:</b> {c.text}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleComment}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
