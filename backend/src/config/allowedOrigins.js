require('dotenv').config();

const allowedOrigins = process.env.NODE_ENV === 'production' ?
[
    'https://onegreek.com',
    'https://www.onegreek.com',
    'https://api.onegreek.com'
]
: [
    'http://localhost:5173',
    'http://192.168.1.183:5173'
];

module.exports = allowedOrigins;