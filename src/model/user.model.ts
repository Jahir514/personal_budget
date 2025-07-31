import mongoose, { Schema, Model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcryptjs';
//create schema
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
    },
    phone: {
      number: {
        type: String,
      },
      code: {
        type: Number,
      },
      status: {
        type: Boolean,
        default: false,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      otp: {
        code: { type: String },
        expiresAt: { type: Date },
      },
    },
    email: {
      type: String,
      default: null,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    contact: {
      address: {
        type: String,
      },
      thana: {
        type: String,
      },
      district: {
        type: String,
      },
      division: {
        type: String,
      },
    },
    emailVerify: {
      code: {
        type: String,
        require: true,
      },
      status: {
        type: Boolean,
        require: true,
        default: false,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
    forgotPassword: {
      code: {
        type: String,
      },
      status: {
        type: Boolean,
      },
      date: {
        type: Date,
      },
    },
  },
  { timestamps: true }
);
//create Indexes
userSchema.index({});

//hash password before saving
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
//compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

//create Model
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
