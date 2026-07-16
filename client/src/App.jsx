import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import API from './api';
import './App.css';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';

// ── Dashboard (contacts page) ──────────────────────────────────────────────
const Dashboard = ({ userName }) => {
    const [contacts, setContacts] = useState([]);
    const [editContact, setEditContact] = useState(null);

    // Load all contacts for the logged-in user
    const fetchContacts = async () => {
        try {
            const res = await API.get('/');
            setContacts(res.data || []);
        } catch (err) {
            console.error('Failed to fetch contacts:', err);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const addContact = async (data) => {
        try {
            await API.post('/', data);
            await fetchContacts();
        } catch (err) {
            console.error('Failed to add contact:', err);
            alert('Could not save contact. Please check the backend and MongoDB connection.');
        }
    };

    const deleteContact = async (id) => {
        try {
            await API.delete(`/${id}`);
            await fetchContacts();
        } catch (err) {
            console.error('Failed to delete contact:', err);
        }
    };

    const updateContact = async (data) => {
        try {
            await API.put(`/${editContact._id}`, data);
            setEditContact(null);
            await fetchContacts();
        } catch (err) {
            console.error('Failed to update contact:', err);
        }
    };

    return (
        <div>
            <Navbar userName={userName} />
            <div className="dashboard-layout">
                <aside className="form-panel">
                    <h2 className="panel-title">{editContact ? 'Edit Contact' : 'Add Contact'}</h2>
                    <ContactForm
                        onSubmit={editContact ? updateContact : addContact}
                        existing={editContact}
                    />
                </aside>
                <main className="list-panel">
                    <h2 className="panel-title">All Contacts <span className="contact-count">{contacts.length}</span></h2>
                    <ContactList
                        contacts={contacts}
                        onDelete={deleteContact}
                        onEdit={setEditContact}
                    />
                </main>
            </div>
        </div>
    );
};

// ── App (router) ───────────────────────────────────────────────────────────
const App = () => {
    const [userName, setUserName] = useState(localStorage.getItem('userName') || '');

    const handleAuthSuccess = (name) => {
        setUserName(name);
    };

    return (
        <Routes>
            <Route path="/login" element={<Login onAuthSuccess={handleAuthSuccess} />} />
            <Route path="/register" element={<Register onAuthSuccess={handleAuthSuccess} />} />
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Dashboard userName={userName} />
                    </PrivateRoute>
                }
            />
            {/* Redirect unknown paths to dashboard (PrivateRoute handles auth) */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default App;
