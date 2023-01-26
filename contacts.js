const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");
const { v4: uuidv4 } = require("uuid");

const getAllContacts = async () => {
  const dataString = await fs.readFile(contactsPath, "utf-8");
  const data = JSON.parse(dataString);
  return data;
};

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const idToString = String(contactId);
  const contactById = contacts.find((item) => item.id === idToString);
  return contactById || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idToString = String(contactId);
  const index = contacts.findIndex((item) => item.id === idToString);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};