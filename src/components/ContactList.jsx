import React from 'react';
import styles from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = (contacts, filter, onSearch, onDelete) => {
  const handleDelete = deletingContact => {
    //alert(deletingContact.name);
    const newContacts = contacts.filter(
      contact => contact.id !== deletingContact.id
    );
    onDelete(newContacts); // Trimit noile contacte către părinte pentru a le actualiza
  };

  return (
    <>
      <h4>Find contacts by name</h4>
      <input
        type="text"
        name="search"
        onChange={e => onSearch(e.target.value)}
      />

      <ul className={styles.listContainer}>
        {contacts
          .filter(contact => {
            return (
              filter.toLowerCase() === '' ||
              contact.name.toLowerCase().includes(filter.toLowerCase())
            );
          })
          .map(contact => (
            <li key={contact.id}>
              {contact.name}: {contact.number}
              <button onClick={() => handleDelete(contact)}>Delete</button>
            </li>
          ))}
      </ul>
    </>
  );
};

ContactList.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default ContactList;
