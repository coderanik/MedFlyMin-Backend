import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      return res.json({ success: true, message: "Welcome Admin", token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error in adminLogin:", error);
    // Return an error response to avoid leaving the request hanging
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
