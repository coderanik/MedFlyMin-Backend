import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pharmacistWelcomeEmail} from "../../utils/emailSender.js";
import Pharmacist from "../../models/Pharmacist.js";


export const pharmacyRegister = async (req, res) => {
  const { pharmacyName, ownerName, email, password, address, licenseNumber , phoneNumber } = req.body;

  // Basic validation
  if (!pharmacyName || !ownerName || !email || !password || !address?.street || !address?.city || !address?.state || !address?.pincode || !phoneNumber) {
    return res.status(400).json({ error: "All required fields must be filled" });
  }

  if (!licenseNumber || licenseNumber.trim() === "") {
    return res.status(400).json({ error: "License number is required for Pharmacist Registration" });
  }

  try {
    const existingUser = await Pharmacist.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Pharmacist already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new Pharmacist({
      pharmacyName,
      ownerName,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      licenseNumber,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 3600000,
    });

    pharmacistWelcomeEmail(email, ownerName,pharmacyName);

    return res.json({ success: true });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const pharmacyLogin = async (req, res) => {
    const { identifier, password } = req.body; // "identifier" can be email or phone
  
    if (!identifier || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    try {
      // Try to find the user by email or phone
      const user = await Pharmacist.findOne({
        $or: [{ email: identifier }, { phoneNumber: identifier }],
      });
  
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 3600000, // 1 hour
      });
  
      return res.json({ success: true, message: "Login successful" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
  

export const pharmacyLogout = async (req, res) => { 
  try {
    res.cookie("token", "", { // Clear the token cookie
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 0,
    });

    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

