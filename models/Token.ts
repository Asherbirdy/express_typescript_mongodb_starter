import mongoose, { Document, Schema } from 'mongoose'

interface IToken extends Document {
  refreshToken: string;
  ip: string;
  userAgent: string;
  isValid: boolean;
  user: mongoose.Schema.Types.ObjectId;
}

const TokenSchema: Schema = new Schema(
  {
    refreshToken: {
      type: String,
      required: true,
    },
    ip: { 
      type: String, 
      required: true 
    },
    userAgent: { 
      type: String, 
      required: true 
    },
    isValid: { 
      type: Boolean, 
      default: true 
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

const Token = mongoose.model<IToken>('Token', TokenSchema)

export default Token
