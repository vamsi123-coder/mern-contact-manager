import React,{useState,useEffect} from 'react';

const ContactForm = ({onSubmit, existing}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    useEffect(() => {
        if (existing) {
            setName(existing.name);
            setEmail(existing.email);
            setPhone(existing.phone);
        } else {
            setName('');
            setEmail('');
            setPhone('');
        }
    }, [existing]);
    const handleSuubmit = (e) => {
        e.preventDefault();
        onSubmit({name,email,phone});
        setName('');
        setEmail('');
        setPhone('');

    };
    return (
        <form onSubmit={handleSuubmit}>
            <input 
            type="text"
            value={name} 
            required
            placeholder="Name"
            onChange={(e) => setName(e.target.value)} />
            <input 
            type="email" 
            value={email} 
            required
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)} />
            <input 
            type="text" 
            value={phone} 
            required
            placeholder="Phone"  
            onChange={(e) => setPhone(e.target.value)} 
        />
        <button type="submit">{existing?"Update":"Add"}</button>
            
            
        </form>
    );

};

export default ContactForm;