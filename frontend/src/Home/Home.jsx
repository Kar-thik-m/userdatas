import React, { useState, useEffect } from 'react';
import { useAuth } from '../ContextApi/AuthContext';
import HomeStyle from "../Home/Home.module.css";


const Home = () => {
    const { logout, user } = useAuth();
    const [usersData, setUsersData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);  
    const [usersPerPage] = useState(5); 

    
    const totalPages = Math.ceil(usersData.length / usersPerPage);

  
    const handleLogout = () => {
        logout();
    };


    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const response = await fetch('http://localhost:5000/user/usersdata', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsersData(data);
                } else {
                    console.error('Failed to fetch users data');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsersData();
    }, []);

    // Get the users for the current page
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = usersData.slice(indexOfFirstUser, indexOfLastUser);

    
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className={HomeStyle.headers}>
                <button onClick={handleLogout}>Logout</button>
                <h2>User List</h2>
            </div>


            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Profile Image</th>
                        <th>Date of Birth</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((userData, index) => (
                        <tr key={userData.id || index}>
                            <td>{index + 1}</td>
                            <td>{userData.username}</td>
                            <td>{userData.email}</td>
                            <td>
                                <img
                                    src={userData.userimage?.url}
                                    alt="Profile"
                                    width="50"
                                    height="50"
                                />
                            </td>
                            <td>{userData.dob}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


            <div className={HomeStyle.pagination}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </>
    );
};

export default Home;
