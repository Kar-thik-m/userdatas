import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RStyle from "../Register/Register.module.css";
import Logo from "../assets/logo.png";
import { useAuth } from '../ContextApi/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Register = () => {
    const navigate = useNavigate();
    const { register, loading, user, error } = useAuth();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        image: null,
        dob: '',
    });

  
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            image: name === 'image' ? files[0] : prevData.image,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('username', formData.username);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('dob', formData.dob);
        if (formData.image) {
            data.append('file', formData.image); 
        }

        try {
            await register(data); 
        } catch (err) {
            console.error("Registration failed", err);
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/login"); 
        }
    }, [user, navigate]);

    return (
        <div className={RStyle.whole}>
            <div className={RStyle.card}>
                <div className={RStyle.logo}>
                    <img src={Logo} className={RStyle.image} alt="Logo" />
                </div>
                <h2 className={RStyle.title}>Welcome to Printerest</h2>
                <form onSubmit={handleSubmit} className={RStyle.form}>
                    <div className={RStyle.inputGroup}>
                        <label htmlFor="username" className={RStyle.label}>Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className={RStyle.input}
                        />
                    </div>
                    <div className={RStyle.inputGroup}>
                        <label htmlFor="email" className={RStyle.label}>Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={RStyle.input}
                        />
                    </div>
                    <div className={RStyle.inputGroup}>
                        <label htmlFor="password" className={RStyle.label}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className={RStyle.input}
                        />
                    </div>
                    <div className={RStyle.inputGroup}>
                        <label htmlFor="dob" className={RStyle.label}>Date of Birth:</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                            className={RStyle.input}
                        />
                    </div>
                    <div className={RStyle.inputGroup}>
                        <label htmlFor="image" className={RStyle.label}>Profile Image:</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className={RStyle.input}
                        />
                    </div>
                    <button type="submit" className={RStyle.button}>
                        {loading ? (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CircularProgress size={24} color="inherit" sx={{ marginRight: '10px' }} />
                                Loading...
                            </Box>
                        ) : (
                            'Submit'
                        )}
                    </button>
                    {error && <p className={RStyle.error}>{error}</p>} 
                    <div className={RStyle.check}>
                        <h4>Already have an account? Click- <Link to="/login" className={RStyle.Login}>Login</Link></h4>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
