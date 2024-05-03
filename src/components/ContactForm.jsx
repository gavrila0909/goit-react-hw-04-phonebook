import React, { useState } from 'react';
import styles from './ContactForm.module.css';
import PropTypes from 'prop-types';

const ContactForm = onAddContact => {
  const [formData, setFormData] = useState({ name: '', number: '' });

  const handleSubmit = e => {
    //verificare daca inputul nu este gol
    e.preventDefault();
    if (formData.trim() !== '') {
      onAddContact(formData);
      setFormData({ name: '', number: '' });
    }
  };

  const handleInputChange = event => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    //console.log(inputName);
    //console.log(inputValue);
    setFormData({ ...formData, [inputName]: inputValue });
  };

  return (
    <form className={styles.formContainer}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleInputChange} //(event) => this.handleInputChange(event) pot face asa fara a mai pune functia, dar e recomandat cu functie
        pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label htmlFor="number">Number:</label>
      <input
        type="tel"
        id="number"
        name="number"
        value={formData.number}
        onChange={handleInputChange}
        pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button type="button" onClick={handleSubmit}>
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
export default ContactForm;
