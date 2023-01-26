const fs = require("fs").promises;
const { log } = require("console");
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");
const { v4: uuidv4 } = require("uuid");

const getAllContacts = async () => {
  const dataString = await fs.readFile(contactsPath, "utf-8");
  const data = JSON.parse(dataString);
  return data;
};

const listContacts = async () => {
  const contactList = await getAllContacts();
  console.log(`Contact list: `);
  console.table(contactList);
};

const getContactById = async (contactId) => {
  const contactList = await getAllContacts();
  const contact = contactList.find(({ id }) => id === contactId);
  console.log(`Contact ID ${contactId}: `);
  console.table(contact);
};

const removeContact = async (contactId) => {
  const contactList = await getAllContacts();
  const index = contactList.findIndex(({ id }) => id === contactId);
  const dltContact = contactList[index];
  if (index !== -1) {
    contactList.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactList));
    console.log(`The contact ID ${contactId} - removed: `);
    console.table(dltContact);
  }
};

const addContact = async (name, email, phone) => {
  const contactList = await getAllContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  contactList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactList));
  console.log(`A contact ${name} added to the contacts: `);
  console.table(newContact);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};