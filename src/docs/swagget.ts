import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routes/api.ts"];
const doc = {
    info: {
        version: "1.0.0",
        title: "Event Sale API",
        description: "API for Event Sale - Authentication and User Management",
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Local server"
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        },
        schemas: {
            User: {
                type: "object",
                properties: {
                    _id: { type: "string", description: "User ID" },
                    fullName: { type: "string", description: "User full name" },
                    username: { type: "string", description: "Unique username" },
                    email: { type: "string", format: "email", description: "User email address" },
                    role: { 
                        type: "string", 
                        enum: ["admin", "user"], 
                        description: "User role",
                        default: "user"
                    },
                    profilePicture: { 
                        type: "string", 
                        description: "Profile picture URL",
                        default: "userDefault.png"
                    },
                    isActive: { 
                        type: "boolean", 
                        description: "Account activation status",
                        default: false
                    },
                    activationCode: { 
                        type: "string", 
                        description: "Email verification code"
                    },
                    createdAt: { 
                        type: "string", 
                        format: "date-time", 
                        description: "Account creation date"
                    },
                    updatedAt: { 
                        type: "string", 
                        format: "date-time", 
                        description: "Last update date"
                    }
                }
            },
            RegisterRequest: {
                type: "object",
                required: ["fullName", "username", "email", "password", "confirmPassword"],
                properties: {
                    fullName: {
                        type: "string",
                        description: "User full name"
                    },
                    username: {
                        type: "string",
                        description: "Unique username"
                    },
                    email: {
                        type: "string",
                        format: "email",
                        description: "User email address"
                    },
                    password: {
                        type: "string",
                        minLength: 8,
                        description: "Password (min 8 chars, must contain uppercase, lowercase, and number)"
                    },
                    confirmPassword: {
                        type: "string",
                        description: "Password confirmation"
                    }
                }
            },
            LoginRequest: {
                type: "object",
                required: ["identifier", "password"],
                properties: {
                    identifier: {
                        type: "string",
                        description: "Email or username"
                    },
                    password: {
                        type: "string",
                        description: "User password"
                    }
                }
            },
            ApiResponse: {
                type: "object",
                properties: {
                    message: { type: "string", description: "Response message" },
                    data: { type: "object", description: "Response data" },
                    error: { type: "string", description: "Error message (if any)" }
                }
            }
        }
    },
    tags: [
        {
            name: "Auth",
            description: "Authentication endpoints"
        }
    ]
}

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);