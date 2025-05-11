import mongoose from "mongoose";

const pharmacistSchema = new mongoose.Schema({
  pharmacyName: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  licenseNumber: {
    type: String,
    required:true
  },
});

const Pharmacist = mongoose.model("Pharmacist", pharmacistSchema);

export default Pharmacist;
