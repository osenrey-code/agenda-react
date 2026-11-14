import React, { useMemo, useState } from 'react';

const initialContacts = [
  { id: 1, name: 'Ana Martínez', phone: '809-555-0142', email: 'ana@email.com' },
  { id: 2, name: 'Carlos Pérez', phone: '829-555-0187', email: 'carlos@email.com' },
];

function ContactForm({ onAddContact }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddContact(form);
    setForm({ name: '', phone: '', email: '' });
  }

  return (
    <section className="panel form-panel" aria-labelledby="form-title">
      <div>
        <p className="eyebrow">Nuevo contacto</p>
        <h2 id="form-title">Agrega a tu agenda</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre completo</label>
        <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Ej. María López" required />

        <label htmlFor="phone">Teléfono</label>
        <input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="809-555-0000" required />

        <label htmlFor="email">Correo electrónico</label>
        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="nombre@correo.com" required />

        <button type="submit">Guardar contacto</button>
      </form>
    </section>
  );
}

function ContactList({ contacts, onDeleteContact }) {
  return (
    <section className="panel list-panel" aria-labelledby="list-title">
      <div className="list-heading">
        <div>
          <p className="eyebrow">Mis contactos</p>
          <h2 id="list-title">Lista de contactos</h2>
        </div>
        <span className="counter">{contacts.length}</span>
      </div>

      {contacts.length === 0 ? (
        <p className="empty-state">Aún no has agregado contactos.</p>
      ) : (
        <ul className="contact-list">
          {contacts.map((contact) => (
            <li key={contact.id} className="contact-card">
              <div className="avatar" aria-hidden="true">{contact.name.charAt(0).toUpperCase()}</div>
              <div className="contact-info">
                <h3>{contact.name}</h3>
                <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}>{contact.phone}</a>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </div>
              <button className="delete-button" type="button" onClick={() => onDeleteContact(contact.id)} aria-label={`Eliminar a ${contact.name}`}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function App() {
  const [contacts, setContacts] = useState(initialContacts);
  const [search, setSearch] = useState('');

  const visibleContacts = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return contacts;
    return contacts.filter((contact) => Object.values(contact).some((value) => String(value).toLowerCase().includes(term)));
  }, [contacts, search]);

  function addContact(contact) {
    setContacts((current) => [{ ...contact, id: crypto.randomUUID() }, ...current]);
  }

  function deleteContact(id) {
    setContacts((current) => current.filter((contact) => contact.id !== id));
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Tarea 4 · React</p>
          <h1>Mi agenda personal</h1>
          <p className="intro">Organiza y encuentra los datos de tus contactos en un solo lugar.</p>
        </div>
        <label className="search" htmlFor="search">
          <span>Buscar</span>
          <input id="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Nombre, teléfono o correo" />
        </label>
      </header>

      <div className="content-grid">
        <ContactForm onAddContact={addContact} />
        <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
      </div>
    </main>
  );
}
