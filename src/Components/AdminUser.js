import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
function AdminUser() {
  
  const [isAdmin, setIsAdmin] = useState(false); 
  const [loading, setLoading] = useState(true);
  const [userdata,setuserdata]=useState([]);
  useEffect(() => {
    
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = '/signup'; 
      } else {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_Backend_URL}/api/Admin/getUser`,
            {
              headers: {
                Authorization: `Bearer ${token}`, 
              },
            }
          );
        
         
          if (response.data.userType === 'Admin') {
            setIsAdmin(true); 
            setuserdata(response.data.UserData);
          } else {
            window.location.href = '/'; 
          
          }
        } catch (error) {
          console.error('Error fetching admin data', error.response || error.message);
          window.location.href = '/'; 
          
        }
        finally {
          setLoading(false); 
        } 
      }
    };

    fetchUserData(); 
  }, []); 

  if (loading) {
    return <Loader />; 
  }

  return (
    <div className="admin-container">
    {isAdmin && (
      <>
      <details className="user-details">
           <summary className="toggle-summary">Users</summary>
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>User Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userdata.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.userType}</td>
                <button
                      className="btn proceed-to-check"
                    
                    >
                    <svg style={{marginTop:'4px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
                    </button>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      <details className="order-details">
           <summary className="toggle-summary">Ordered Prducts</summary>
          
      </details>
    </>
    )}
  </div>
  );
}

export default AdminUser;
