import { createUser, listUsers, updateUser, deleteUser } from "../../services/admin/user.service.js";

export const createUserController = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.json({ message: "User created & OTP sent", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const listUsersController = async (req, res) => {
  const users = await listUsers();
  res.json(users);
};

export const updateUserController = async (req, res) => {
  const { id } = req.params;
  await updateUser(id, req.body);
  res.json({ message: "User updated" });
};

export const deleteUserController = async (req, res) => {
  const { id } = req.params;
  await deleteUser(id);
  res.json({ message: "User deleted" });
};
