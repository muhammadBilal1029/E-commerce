import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import Users from './Users';
function AdminUser() {
  
  const [isAdmin, setIsAdmin] = useState(false); 
  const [loading, setLoading] = useState(true);
  const [userdata,setuserdata]=useState([]);
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
  useEffect(() => {
    fetchUserData(); 
  }, []); 
   
  if (loading) {
    return <Loader />; 
  }

  return (
    <>
    <h1 className="admin-title">Admin Dashboard</h1>
    <div className="admin-container">
    {isAdmin && (
      <>
      
      <Users userdata={userdata} fetchUserData={fetchUserData}/>
      <details className="order-details">
           <summary className="toggle-summary">Ordered Prducts</summary>
            <h1>bilal</h1>
      </details>
    </>
    )}
  </div>
  </>
  );
}

export default AdminUser;
