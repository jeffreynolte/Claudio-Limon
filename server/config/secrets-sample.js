// Rename this file to secrets.js
var secrets = {}

secrets.gmail = {};
secrets.db = {};

secrets.gmail.user_name = process.env.GMAIL_USER || 'gmail username';
secrets.gmail.password = process.env.GMAIL_PASSWORD || 'gmail password';

secrets.db.production = process.env.MONGO_URL || 'production url';

module.exports = secrets;