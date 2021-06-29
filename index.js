const contacts = require("./contacts");
const fs = require("fs").promises;

(async () => {
  try {
    const allProducts = await contacts.listContacts();
    console.log(allProducts);
    await contacts.del("7");
  } catch (error) {
    console.log(error);
  }
})();

// module.exports = getAll;
// console.log("Hello");
