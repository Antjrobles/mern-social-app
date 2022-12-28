import moongose from 'mongoose';

const UserSchema = new moongose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
    },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
    },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,  /* The mail must be unique */
    },
        password: {
            type: String,
            required: true,
            min: 5,
    },
    
        picturePath: {
            type: String,
            default: "",
    },
        friends: {
            type: Array,
            default: [],
    },
        location: String,
        occupation: String,
        viewedProfile: Number,
        impressions: Number,
    }, {timestamps: true}   /* This is to add the createdAt and updatedAt fields */
);

const User = moongose.model('User', UserSchema);

export default User;




























