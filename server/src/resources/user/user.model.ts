import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import User from '@/resources/user/user.interface';

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        login: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        active:{
            type: Boolean,
            required: true,
        },
        banned:{
            type: Boolean,
            required: true,
        },
        orders:{
            type: [Schema.Types.ObjectId]
        },
        cart:{
            type: String
        }
    },
    { timestamps: true }
);

UserSchema.pre<User>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);

    next();
});

UserSchema.methods.isValidPassword = async function (
    password: string
): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password);
};

export default model<User>('User', UserSchema);
