import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function HomePage({ user, onLogout }) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const navigate = useNavigate();

  // Load posts from localStorage
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(savedPosts);
  }, []);

  const handleAddPost = () => {
    const updatedPosts = [
      ...posts,
      { id: Date.now(), title: postTitle, content: newPost, image, isEditing: false },
    ];
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    closeModal(); // Close the modal after adding a post
  };

  const handleDeletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setPostTitle(post.title);
    setNewPost(post.content);
    setImage(post.image);
    setIsModalOpen(true);
  };

  const handleUpdatePost = () => {
    const updatedPosts = posts.map((post) =>
      post.id === editingPost.id
        ? { ...post, title: postTitle, content: newPost, image }
        : post
    );
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPostTitle("");
    setNewPost("");
    setImage(null);
    setEditingPost(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />

      <div className="container mx-auto p-4 flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome to BlogApp</h1>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
          >
            {editingPost ? "Edit Post" : "Add New Post"}
          </button>
        </div>

        {/* Modal for Adding/Editing Post */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-full">
              <h2 className="text-xl mb-4">{editingPost ? "Edit Post" : "Add New Post"}</h2>
              <input
                type="text"
                placeholder="Post Title"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                className="w-full p-2 mb-4 border"
              />
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Write your blog post"
                className="w-full p-2 mb-4 border"
              />
              <input
                type="file"
                onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
                className="mb-4"
              />
              {image && (
                <div className="mb-4">
                  <img src={image} alt="Post" className="w-32 h-32 object-cover" />
                </div>
              )}
              <div className="flex justify-between mt-auto">
                <button
                  onClick={editingPost ? handleUpdatePost : handleAddPost}
                  className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                >
                  {editingPost ? "Update Post" : "Add Post"}
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <h2 className="text-2xl font-semibold mb-4">Your Posts</h2>

        {/* Display posts in 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 border rounded-lg shadow-md bg-white flex flex-col"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-32 object-cover rounded-t-lg mb-4"
                />
              )}
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="text-sm mb-2">{post.content}</p>
              <div className="flex justify-between mt-auto">
                <button
                  onClick={() => handleEditPost(post)}
                  className="bg-yellow-500 text-white p-2 text-xs rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="bg-red-500 text-white p-2 text-xs rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
