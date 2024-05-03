import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import styles from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState(
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' }
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }, []);

  const handleAddContact = (name, number) => {
    const existingContact = contacts.find(contact => contact.name === name);
    if (!existingContact) {
      //daca nu exista contactele atunci adaugale in newContact
      const newContact = {
        id: nanoid(),
        name: name,
        number: number,
      };
      setContacts(prevState => ({
        //actualizez starea componentei contacts
        contacts: [...prevState.contacts, newContact],
      }));
    } else {
      alert(`${name} already exist in the list`);
    }
  };

  const handleSearch = filter => {
    setFilter({ filter: filter });
  };

  const handleDelete = newContacts => {
    setContacts({ contacts: newContacts });
  };

  //console.log('Ma randez...'); //sa vad cum functioneaza randarea
  return (
    <>
      <div className={styles.mainContainer}>
        <h2>Phonebook</h2>
        <ContactForm onAddContact={handleAddContact} />

        <h2>Contacts</h2>
        <ContactList
          contacts={contacts}
          filter={filter}
          onSearch={handleSearch}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
};

export default App;
