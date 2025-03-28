import mongoose, { Schema, Document, CallbackError } from "mongoose";
import bcrypt from "bcrypt";

export interface IAdmin extends Document {
  userId: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const AdminSchema = new Schema<IAdmin>({
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

AdminSchema.pre<IAdmin>("save", async function (next: (err?: CallbackError) => void) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    // Castea el error a CallbackError
    next(error as CallbackError);
  }
});

AdminSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);
export default Admin;
