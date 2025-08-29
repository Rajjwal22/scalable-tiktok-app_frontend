import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [producer, setProducer] = useState("");
  const [genre, setGenre] = useState("");
  const [ageRating, setAgeRating] = useState("PG");
  const [videoFile, setVideoFile] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!videoFile) return alert("Please select a video file");

    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("publisher", publisher);
    formData.append("producer", producer);
    formData.append("genre", genre);
    formData.append("ageRating", ageRating);
    formData.append("video", videoFile);

    try {
      await axios.post(`${API_BASE}/videos`, formData, {
        headers: { Authorization: token, "Content-Type": "multipart/form-data" }
      });
      alert("Video uploaded successfully!");
      navigate("/dashboard");
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to upload video";
      alert(msg);
      console.error(err?.response?.data || err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
      <h2 className="text-xl font-bold mb-4 text-blue-600">📤 Upload a New Video</h2>

      <form className="space-y-4" onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Publisher"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Producer"
          value={producer}
          onChange={(e) => setProducer(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          value={ageRating}
          onChange={(e) => setAgeRating(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="PG">PG</option>
          <option value="12">12</option>
          <option value="15">15</option>
          <option value="18">18</option>
        </select>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
          className="w-full"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition">
          Upload Video
        </button>
      </form>
    </div>
  );
}
