// src/config/config.js
require("dotenv").config(); // To load environment variables from .env file

// Database configuration for Sequelize
module.exports.dbConfig = {
  mongoUri: process.env.MONGODB_URL,
};

module.exports.jwtConfig = {
  jwt: process.env.JWT_SECRET,
};

module.exports.environment = {
  node: process.env.NODE_ENV || "development",
};

// Helmet security settings
module.exports.helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      scriptSrc: ["'self'", "'unsafe-eval'"],
    },
  },
  frameguard: { action: "deny" }, // Disable framing
  xssFilter: true, // Enable XSS filter
  noSniff: true, // Prevent browsers from sniffing content type
};
