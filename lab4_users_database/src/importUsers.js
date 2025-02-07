const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const fs = require('fs');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Load JSON data
const users = JSON.parse(fs.readFileSync('./src/UsersData.json', 'utf-8'));

// Insert Users into Database
const importData = async () => {
    try {
        await User.deleteMany(); // Clear existing data
        await User.insertMany(users);
        console.log('Users Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

// Run the function
importData();
