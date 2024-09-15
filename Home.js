// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Home({ token, setToken }) {
//   const [user, setUser] = useState(null);
//   const [recommendations, setRecommendations] = useState([]);
//   const [search, setSearch] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   const fetchUser = async () => {
//     const res = await axios.get(`http://localhost:5000/api/users/me`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     setUser(res.data);
//   };

//   const fetchRecommendations = async () => {
//     const res = await axios.get(`http://localhost:5000/api/friends/recommendations`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     setRecommendations(res.data);
//   };

//   const handleSearch = async () => {
//     const res = await axios.get(`http://localhost:5000/api/users/search?query=${search}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     setSearchResults(res.data);
//   };

//   useEffect(() => {
//     fetchUser();
//     fetchRecommendations();
//   }, []);

//   return (
//     <div>
//       <h2>Welcome {user?.username}</h2>
//       <button onClick={() => setToken('')}>Logout</button>

//       <h3>Search Users</h3>
//       <input value={search} onChange={(e) => setSearch(e.target.value)} />
//       <button onClick={handleSearch}>Search</button>

//       {searchResults.length > 0 && (
//         <div>
//           <h4>Search Results</h4>
//           <ul>
//             {searchResults.map((user) => (
//               <li key={user._id}>{user.username}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <h3>Friend Recommendations</h3>
//       <ul>
//         {recommendations.map((user) => (
//           <li key={user._id}>{user.username}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Home;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home({ token, setToken }) {
  const [user, setUser] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const fetchUser = async () => {
    const res = await axios.get(`http://localhost:5000/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUser(res.data);
  };

  const fetchRecommendations = async () => {
    const res = await axios.get(`http://localhost:5000/api/friends/recommendations/${user._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setRecommendations(res.data);
  };

  const handleSearch = async () => {
    const res = await axios.get(`http://localhost:5000/api/users/search?query=${search}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setSearchResults(res.data);
  };

  useEffect(() => {
    if (token) {
      fetchUser();
      fetchRecommendations();
    }
  }, [token]);

  return (
    <div>
      <h2>Welcome {user?.username}</h2>
      <button onClick={() => setToken('')}>Logout</button>

      <h3>Search Users</h3>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      {searchResults.length > 0 && (
        <div>
          <h4>Search Results</h4>
          <ul>
            {searchResults.map((user) => (
              <li key={user._id}>{user.username}</li>
            ))}
          </ul>
        </div>
      )}

      <h3>Friend Recommendations</h3>
      <ul>
        {recommendations.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;

