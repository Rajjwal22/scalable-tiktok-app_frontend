import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/videos")
      .then((res) => setVideos(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">🎬 Latest Videos</h2>

      {videos.length === 0 ? (
        <p className="text-center text-gray-500">No videos uploaded yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {videos.map((v) => (
            <Link to={`/video/${v._id}`} key={v._id}>
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-3">
                <img
                  src={`http://localhost:5000${v.thumbnailUrl || "/uploads/default.png"}`}
                  alt={v.title}
                  className="rounded-xl w-full h-48 object-cover mb-3"
                />
                <h3 className="text-lg font-semibold truncate">{v.title}</h3>
                <p className="text-gray-500 text-sm">By {v.publisher}</p>
                <p className="text-yellow-500 text-sm mt-1">⭐ {v.averageRating || "No rating yet"}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
