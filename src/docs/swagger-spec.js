const { ServerConfig } = require("../config");

const envelope = (dataSchema) => ({
    type: "object",
    properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        data: dataSchema,
        error: { type: "object" }
    }
});

const errorEnvelope = {
    type: "object",
    properties: {
        success: { type: "boolean", example: false },
        message: { type: "string" },
        data: { type: "object" },
        error: {}
    }
};

const schemas = {
    User: {
        type: "object",
        properties: {
            id: { type: "integer" },
            email: { type: "string", format: "email" },
            name: { type: "string" },
            role: { type: "string", enum: ["user", "admin"] }
        }
    },
    RegisterRequest: {
        type: "object",
        required: ["email", "password", "name"],
        properties: {
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 8 },
            name: { type: "string" }
        }
    },
    LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
            email: { type: "string", format: "email" },
            password: { type: "string" }
        }
    },
    LoginResponseData: {
        type: "object",
        properties: {
            token: { type: "string" },
            user: { $ref: "#/components/schemas/User" }
        }
    },
    Airplane: {
        type: "object",
        properties: {
            id: { type: "integer" },
            modelNumber: { type: "string" },
            capacity: { type: "integer" }
        }
    },
    CreateAirplaneRequest: {
        type: "object",
        required: ["modelNumber", "capacity"],
        properties: {
            modelNumber: { type: "string" },
            capacity: { type: "integer", minimum: 1 }
        }
    },
    City: {
        type: "object",
        properties: {
            id: { type: "integer" },
            name: { type: "string" }
        }
    },
    CreateCityRequest: {
        type: "object",
        required: ["name"],
        properties: {
            name: { type: "string", minLength: 2, maxLength: 100 }
        }
    },
    Airport: {
        type: "object",
        properties: {
            id: { type: "integer" },
            name: { type: "string" },
            code: { type: "string", minLength: 3, maxLength: 3 },
            address: { type: "string" },
            cityId: { type: "integer" }
        }
    },
    CreateAirportRequest: {
        type: "object",
        required: ["name", "code", "address", "cityId"],
        properties: {
            name: { type: "string", minLength: 2, maxLength: 150 },
            code: { type: "string", minLength: 3, maxLength: 3, example: "BOM" },
            address: { type: "string" },
            cityId: { type: "integer" }
        }
    },
    Flight: {
        type: "object",
        properties: {
            id: { type: "integer" },
            flightNumber: { type: "string" },
            airplaneId: { type: "integer" },
            departureAirportId: { type: "integer" },
            arrivalAirportId: { type: "integer" },
            departureTime: { type: "string", format: "date-time" },
            arrivalTime: { type: "string", format: "date-time" },
            price: { type: "number", format: "float" },
            totalSeats: { type: "integer" }
        }
    },
    CreateFlightRequest: {
        type: "object",
        required: ["flightNumber", "airplaneId", "departureAirportId", "arrivalAirportId", "departureTime", "arrivalTime", "price"],
        properties: {
            flightNumber: { type: "string", example: "AI101" },
            airplaneId: { type: "integer" },
            departureAirportId: { type: "integer" },
            arrivalAirportId: { type: "integer" },
            departureTime: { type: "string", format: "date-time" },
            arrivalTime: { type: "string", format: "date-time" },
            price: { type: "number", format: "float", minimum: 0 }
        }
    },
    Booking: {
        type: "object",
        properties: {
            id: { type: "integer" },
            flightId: { type: "integer" },
            userId: { type: "integer" },
            noOfSeats: { type: "integer" },
            totalCost: { type: "number", format: "float" },
            status: { type: "string", enum: ["PENDING", "BOOKED", "CANCELLED"] }
        }
    },
    CreateBookingRequest: {
        type: "object",
        required: ["flightId", "noOfSeats"],
        properties: {
            flightId: { type: "integer" },
            noOfSeats: { type: "integer", minimum: 1 }
        }
    }
};

const responses = {
    BadRequest: {
        description: "Validation error",
        content: { "application/json": { schema: errorEnvelope } }
    },
    Unauthorized: {
        description: "Missing or invalid JWT",
        content: { "application/json": { schema: errorEnvelope } }
    },
    Forbidden: {
        description: "Authenticated but not permitted",
        content: { "application/json": { schema: errorEnvelope } }
    },
    NotFound: {
        description: "Resource not found",
        content: { "application/json": { schema: errorEnvelope } }
    }
};

const bearerAuth = [{ bearerAuth: [] }];

function crudPaths({ tag, base, singular, createSchema, entitySchema, adminOnly = true }) {
    return {
        [base]: {
            post: {
                tags: [tag],
                summary: `Create a ${singular.toLowerCase()}`,
                security: bearerAuth,
                requestBody: {
                    required: true,
                    content: { "application/json": { schema: { $ref: `#/components/schemas/${createSchema}` } } }
                },
                responses: {
                    201: { description: "Created", content: { "application/json": { schema: envelope({ $ref: `#/components/schemas/${entitySchema}` }) } } },
                    400: responses.BadRequest,
                    401: responses.Unauthorized,
                    ...(adminOnly ? { 403: responses.Forbidden } : {}),
                    404: responses.NotFound
                }
            },
            get: {
                tags: [tag],
                summary: `List all ${singular.toLowerCase()}s`,
                responses: {
                    200: { description: "OK", content: { "application/json": { schema: envelope({ type: "array", items: { $ref: `#/components/schemas/${entitySchema}` } }) } } }
                }
            }
        },
        [`${base}/{id}`]: {
            get: {
                tags: [tag],
                summary: `Get a ${singular.toLowerCase()} by id`,
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
                responses: {
                    200: { description: "OK", content: { "application/json": { schema: envelope({ $ref: `#/components/schemas/${entitySchema}` }) } } },
                    404: responses.NotFound
                }
            }
        }
    };
}

const swaggerSpec = {
    openapi: "3.0.3",
    info: {
        title: "Airline Booking API",
        version: "1.0.0",
        description: "REST API for browsing flights and booking seats."
    },
    servers: [{ url: `http://localhost:${ServerConfig.PORT}/api/v1` }],
    tags: [
        { name: "Info" },
        { name: "Auth" },
        { name: "Airplanes" },
        { name: "Cities" },
        { name: "Airports" },
        { name: "Flights" },
        { name: "Bookings" }
    ],
    components: {
        securitySchemes: {
            bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
        },
        schemas
    },
    paths: {
        "/info": {
            get: {
                tags: ["Info"],
                summary: "Health check",
                responses: {
                    200: { description: "OK", content: { "application/json": { schema: envelope({ type: "object" }) } } }
                }
            }
        },
        "/auth/register": {
            post: {
                tags: ["Auth"],
                summary: "Register a new user",
                requestBody: {
                    required: true,
                    content: { "application/json": { schema: { $ref: "#/components/schemas/RegisterRequest" } } }
                },
                responses: {
                    201: { description: "Created", content: { "application/json": { schema: envelope({ $ref: "#/components/schemas/User" }) } } },
                    400: responses.BadRequest,
                    409: { description: "Email already registered", content: { "application/json": { schema: errorEnvelope } } }
                }
            }
        },
        "/auth/login": {
            post: {
                tags: ["Auth"],
                summary: "Log in and receive a JWT",
                requestBody: {
                    required: true,
                    content: { "application/json": { schema: { $ref: "#/components/schemas/LoginRequest" } } }
                },
                responses: {
                    200: { description: "OK", content: { "application/json": { schema: envelope({ $ref: "#/components/schemas/LoginResponseData" }) } } },
                    400: responses.BadRequest,
                    401: responses.Unauthorized
                }
            }
        },
        "/airplanes": {
            post: {
                tags: ["Airplanes"],
                summary: "Create an airplane (admin only)",
                security: bearerAuth,
                requestBody: {
                    required: true,
                    content: { "application/json": { schema: { $ref: "#/components/schemas/CreateAirplaneRequest" } } }
                },
                responses: {
                    201: { description: "Created", content: { "application/json": { schema: envelope({ $ref: "#/components/schemas/Airplane" }) } } },
                    400: responses.BadRequest,
                    401: responses.Unauthorized,
                    403: responses.Forbidden
                }
            }
        },
        ...crudPaths({ tag: "Cities", base: "/cities", singular: "City", createSchema: "CreateCityRequest", entitySchema: "City" }),
        ...crudPaths({ tag: "Airports", base: "/airports", singular: "Airport", createSchema: "CreateAirportRequest", entitySchema: "Airport" }),
        ...crudPaths({ tag: "Flights", base: "/flights", singular: "Flight", createSchema: "CreateFlightRequest", entitySchema: "Flight" }),
        "/bookings": {
            post: {
                tags: ["Bookings"],
                summary: "Book seats on a flight (any authenticated user)",
                security: bearerAuth,
                requestBody: {
                    required: true,
                    content: { "application/json": { schema: { $ref: "#/components/schemas/CreateBookingRequest" } } }
                },
                responses: {
                    201: { description: "Created", content: { "application/json": { schema: envelope({ $ref: "#/components/schemas/Booking" }) } } },
                    400: responses.BadRequest,
                    401: responses.Unauthorized,
                    404: responses.NotFound
                }
            },
            get: {
                tags: ["Bookings"],
                summary: "List all bookings (admin only)",
                security: bearerAuth,
                responses: {
                    200: { description: "OK", content: { "application/json": { schema: envelope({ type: "array", items: { $ref: "#/components/schemas/Booking" } }) } } },
                    401: responses.Unauthorized,
                    403: responses.Forbidden
                }
            }
        },
        "/bookings/me": {
            get: {
                tags: ["Bookings"],
                summary: "List the current user's own bookings",
                security: bearerAuth,
                responses: {
                    200: { description: "OK", content: { "application/json": { schema: envelope({ type: "array", items: { $ref: "#/components/schemas/Booking" } }) } } },
                    401: responses.Unauthorized
                }
            }
        }
    }
};

module.exports = swaggerSpec;
