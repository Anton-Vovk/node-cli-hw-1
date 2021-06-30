const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const findContact = contacts.find((item) => item.id === contactId);
    if (!findContact) throw new Error("Id incorrect!");
    return findContact;
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) throw new Error("In incorrect!");
    const filteredContacts = contacts.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    return contactId;
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const id = v4();
    const newContact = { id, name, email, phone };
    const newContacts = [...contacts, newContact];
    const newContactsStr = JSON.stringify(newContacts);
    await fs.writeFile(contactsPath, newContactsStr);
    return newContact;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
