import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogDetails = ({ user }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        axios.get(`/api/blogs/${id}`)
            .then(response => setBlog(response.data))
            .catch(error => console.error('Error fetching blog:', error));
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await axios.delete(`/api/blogs/${id}`);
                navigate('/'); // Redirect to home after deletion
            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        }
    };

    if (!blog) return <p>Loading...</p>;

    return (
        <div>
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
            {user?.isAdmin && (
                <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white', padding: '10px', border: 'none', cursor: 'pointer' }}>
                    Delete Blog
                </button>
            )}
        </div>
    );
};

export default BlogDetails;
