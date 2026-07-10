import React,{useState,useEffect} from 'react';
import API from './api';
import "./App.css";
import ContactForm from './ContactForm';
import ContactList from './ContactList';
const App = () => {
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState(null);
  console.log(contacts);
  //Load all contacts
  const fetchContacts = async() => {
    const res = await API.get("/");
    setContacts(res.data);
  };
  useEffect(() => {
    fetchContacts();
  }, []);
  // Add new contact
  const addContact = async(data) => {
    await API.post("/",data);
    console.log("sent successfully");
    fetchContacts();
  };
  //Delete contact
  const deleteContact = async(id) => {
    await API.delete(`/${id}`);
    fetchContacts();
  };
  //updtate contact
  const updateContact = async(data) => {
    await API.put(`/${editContact._id}`,data);
    setEditContact(null);
    fetchContacts();

  };
  
 
  return (
    <div>
      <ContactForm 
       onSubmit={editContact ? updateContact:addContact} 
       existing={editContact}
      />
      <ContactList 
        contacts={contacts} 
        onDelete={deleteContact}
        onEdit={setEditContact}
      />
    </div>
  );
};   
export default App;
