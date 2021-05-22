const { AuthenticationError } = require('apollo-server-express');
const { User, Blab } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async(parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('blabs')
                    .populate('friends')

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        users: async() => {
            return User.find()
                .select('-__v -password')
                .populate('blabs')
                .populate('friends')
        },
        user: async(parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('blabs')
        },
        blabs: async(parent, { username }) => {
            const params = username ? { username } : {};
            return Blab.find(params).sort({ createdAt: -1 });
        },
        blab: async(parent, { _id }) => {
            return Blab.findOne({ _id });
        },

    },
    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async(parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        addBlab: async(parent, args, context) => {
            if (context.user) {
                const blab = await Blab.create({...args, username: context.user.username });

                await User.findByIdAndUpdate({ _id: context.user._id }, { $push: { blabs: blab._id } }, { new: true });

                return blab;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addBlabImage: async(parent, { blabText, imageUrl }, context) => {
            if (context.user) {
                const blab = await Blab.create({ blabText: blabText, imageUrl: imageUrl, username: context.user.username });

                await User.findByIdAndUpdate({ _id: context.user._id }, { $push: { blabs: blab._id } }, { new: true });

                return blab;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addComment: async(parent, { blabId, commentBody }, context) => {
            if (context.user) {
                const updatedBlab = await Blab.findOneAndUpdate({ _id: blabId }, { $push: { comments: { commentBody, username: context.user.username } } }, { new: true, runValidators: true });

                return updatedBlab;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addFriend: async(parent, { friendId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { friends: friendId } }, { new: true }).populate('friends');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        likeBlab: async(parent, { _id }, context) => {
            if (context.user) {
                const retrieveBlab = await Blab.find(_id);
                let currentLikes = retrieveBlab.likes;
                currentLikes++;
                return blab.findByIdAndUpdate(_id, { $inc: { quantity: currentLikes } }, { new: true });

            }
            throw new AuthenticationError('You need to be logged in!');

        },
        likeComment: async(parent, { _id }, context) => {
            if (context.user) {
                const retrieveComment = await comment.find(_id);
                let currentLikes = retrieveComment.likes;
                currentLikes++;
                return Comment.findByIdAndUpdate(_id, { $inc: { quantity: currentLikes } }, { new: true });

            }
            throw new AuthenticationError('You need to be logged in!');

        }
    }
};

module.exports = resolvers;