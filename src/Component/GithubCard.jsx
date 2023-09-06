import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import "./GithubCard.css"

function GithubCard() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };


  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error);
      setUserData(null);
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      fetchUserData();
    }
  }, [username, fetchUserData]); 

  return (
    <div className="github-card">
      <h1>Github User Info</h1>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={handleChange}
      />
      {userData && (
        <div className="card">
          <img src={userData.avatar_url} alt="User Avatar" />
          <div className="user-details">
            <p>Username: {userData.login}</p>
            <p>Name: {userData.name || 'N/A'}</p>
            <p>No. of Public Repos: {userData.public_repos}</p>
            <p>No. of Public Gists: {userData.public_gists}</p>
            <p>Profile Created At: {new Date(userData.created_at).toLocaleDateString('en-US')}</p>
          </div>

        </div>
      )}
    </div>
  );
}

export default GithubCard