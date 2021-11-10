const { User } = require('../models')
const { signToken } = require('../utils/auth')

module.exports = {
    async getSingleUser({ user = null, params }, res) {
        const userData = await User.findOne({
            $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
        });

        if (!userData) {
            return res.status(400).json({ message: 'Cannot find a user with this id!' })
        }
        res.json(userData);
    },

    async createUser({ body }, res) {
        const newUser = await User.create(body);

        if (!newUser) {
            return res.status(400).json({ message: 'ERROR!' })
        }
        const token = signToken(newUser);
        res.json({ token, newUser });
    },

    async login({ body }, res) {
        const userData = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });

        if (!userData) {
            return res.status(400).json({ message: 'Cannot find this user!' }) 
        }
        const passwordCheck = await user.isCorrectPassword(body.password);

        if (!passwordCheck) {
            return res.status(400).json({ message: 'Wrong password!' })  
        }
        const token = signToken(userData);
        res.json({ token, userData });
    },

    async saveDog({ user, body }, res) {
        console.log(user);
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { savedDogs: body } },
                { new: true, runValidators: true }
            );
            return res.json(updatedUser);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err)
        }
    },
    
    async deleteDog({ user, body }, res) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { savedDogs: { dogId: params.dogId } } },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'Could not find a user with this ID!' })
        }
        return res.json(updatedUser);
    }
}