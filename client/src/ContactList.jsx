import React from 'react';
const ContactList = ({ contacts, onDelete, onEdit }) => {
    return (
        <div>
            {contacts.length === 0 && (
                <p className="empty-msg">No contacts yet. Add one on the left!</p>
            )}
            <ul>
                {contacts.map((c) => (
                    <li key={c._id}>
                        <div className="contact-info">
                            <strong>{c.name}</strong>
                            <span>{c.email}</span>
                            <span>{c.phone}</span>
                        </div>
                        <div className="contact-actions">
                            <button onClick={() => onEdit(c)}>Edit</button>
                            <button onClick={() => onDelete(c._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default ContactList;
