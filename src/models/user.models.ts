import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// // Se ejecuta antes de guardar el user: Hook para encriptar el password
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next(); // ? no entiendo :v

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

UserSchema.methods.comparePassword = async function (
  password
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', UserSchema);

/* 
import { Schema, model } from 'mongoose';

new Schema({
  email: {
    type: String,
    unique: [true, 'Email already registered!'],
    required: [true, 'Email is required!'],
    lowercase: true,
    trim: true,
  },
});

*/
