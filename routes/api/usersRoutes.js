const express = require('express');
const usersRouter = express.Router();
const { uploadImage } = require('../../middleware/upload');

const {
  userValidation: {
    userRequestValidation,
    userSubValidation,
    userValidationRequest,
    auth,
  },
} = require('../../middleware');
const {
  usersController: {
    registerUserController,
    loginUserController,
    logoutUserController,
    currentUserController,
    subUpdateUserController,
    avatarUpdateUserController,
    verifyUserController,
    reVerificationUserController,
  },
} = require('../../controllers/');

usersRouter.get('/verify/:verificationToken', verifyUserController);

usersRouter.post(
  '/verify',
  userValidationRequest,
  reVerificationUserController,
);

usersRouter.post('/signup', userRequestValidation, registerUserController);

usersRouter.post('/login', userRequestValidation, loginUserController);

usersRouter.use(auth);

usersRouter.get('/logout', logoutUserController);

usersRouter.get('/current', currentUserController);

usersRouter.patch('/avatars', uploadImage, avatarUpdateUserController);

usersRouter.patch('/:userId', userSubValidation, subUpdateUserController);

module.exports = usersRouter;
