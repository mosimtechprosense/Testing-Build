import * as contactService from "../../services/public/contact.service.js";


//* Create a new contact message
export const createMessage = async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !message || (!email && !phone)) {
    return res.status(400).json({
      success: false,
      message: "Name, message and email or phone are required"
    });
  }

  try {
    const newMessage = await contactService.createContactMessage({
      name,
      email,
      phone: phone || null,
      message
    });

    res.status(201).json({
      success: true,
      message: "Message received successfully",
      data: newMessage
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




//* Get all messages
export const getAllMessages = async (req, res) => {
  try {
    const messages = await contactService.getAllContactMessages();
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Get a message by ID
export const getMessageById = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await contactService.getContactMessageById(id);
    if (!message) return res.status(404).json({ success: false, message: "Message not found" });
    res.status(200).json({ success: true, data: message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


//? Update message by ID
export const updateMessage = async (req, res) => {
  const { id } = req.params;
  const { name, email, message } = req.body;

  try {
    const updated = await contactService.updateContactMessage(id, { name, email, message });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error or message not found" });
  }
};


//! Delete message by ID
export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    await contactService.deleteContactMessage(id);
    res.status(200).json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error or message not found" });
  }
};
