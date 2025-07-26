import express from "express";
const router = express.Router();
import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";

/* #swagger.tags = ['Auth'] */
/* #swagger.summary = 'Register a new user' */
/* #swagger.description = 'Register a new user with email verification. User will receive activation email.' */
/* #swagger.requestBody = {
      required: true,
      schema: { $ref: "#/components/schemas/RegisterRequest" }
   }
*/
/* #swagger.responses[200] = { 
      description: 'User registered successfully',
      schema: {
         message: 'Register success',
         data: { $ref: '#/components/schemas/User' }
      }
   }
*/
/* #swagger.responses[400] = { 
      description: 'Validation error or user already exists',
      schema: {
         message: 'Invalid request',
         data: null,
         error: 'Error message'
      }
   }
*/
router.post("/auth/register", authController.register);

/* #swagger.tags = ['Auth'] */
/* #swagger.summary = 'Login user' */
/* #swagger.description = 'Login user with email/username and password. Returns JWT token.' */
/* #swagger.requestBody = {
      required: true,
      schema: { $ref: "#/components/schemas/LoginRequest" }
   }
*/
/* #swagger.responses[200] = { 
      description: 'Login successful',
      schema: {
         message: 'Login success',
         data: 'JWT token string'
      }
   }
*/
/* #swagger.responses[400] = { 
      description: 'Invalid credentials or user not found',
      schema: {
         message: 'User not found or Invalid password',
         data: null,
         error: 'Error message'
      }
   }
*/
router.post("/auth/login", authController.login);

/* #swagger.tags = ['Auth'] */
/* #swagger.summary = 'Get current user info' */
/* #swagger.description = 'Get current authenticated user information. Requires Bearer token.' */
/* #swagger.security = [{bearerAuth: []}] */
/* #swagger.responses[200] = { 
      description: 'User information retrieved successfully',
      schema: {
         message: 'User info retrieved successfully',
         data: { $ref: '#/components/schemas/User' }
      }
   }
*/
/* #swagger.responses[401] = { 
      description: 'Unauthorized - Invalid or missing token',
      schema: {
         message: 'Unauthorized',
         data: null,
         error: 'Invalid token'
      }
   }
*/
router.get("/auth/me", authMiddleware, authController.me);

/* #swagger.tags = ['Auth'] */
/* #swagger.summary = 'Verify email address' */
/* #swagger.description = 'Verify user email address using activation code from email.' */
/* #swagger.parameters['code'] = {
      in: 'query',
      required: true,
      schema: { type: 'string' },
      description: 'Email verification code received via email'
   }
*/
/* #swagger.responses[200] = { 
      description: 'Email verified successfully',
      schema: {
         message: 'Email verified successfully',
         data: { $ref: '#/components/schemas/User' }
      }
   }
*/
/* #swagger.responses[400] = { 
      description: 'Invalid activation code',
      schema: {
         message: 'Invalid activation code',
         data: null,
         error: 'Invalid activation code'
      }
   }
*/
router.get("/auth/verify-email", authController.verifyEmail);

export default router;