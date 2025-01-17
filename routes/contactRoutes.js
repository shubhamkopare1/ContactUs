
const { Router } = require("express");
const router = Router();

const {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
} = require("../controller/contactController.js");



router.post("/create", createContact);
router.get("/list", getAllContacts);
router.get("/details/:id", getContactById);
router.delete("/remove/:id", deleteContact);

module.exports = router;
