const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

// Define a dynamic schema (schemaless)
const User = mongoose.connection.collection('users');

// All users whose gender is male
const males = await User.find({ gender: 'Male' }).toArray();
console.log('All Male Users:', males);

// All users whose ID is even
const evenIdUsers = await User.find({ id: { $mod: [2, 0] } }).toArray();
console.log('Users with Even IDs:', evenIdUsers);

// Users who currently live in Japan
const japanResidents = await User.find({ native: 'Japan' }).toArray();
console.log('Users Living in Japan:', japanResidents);

// Users who are female and live in India
const femaleInIndia = await User.find({ gender: 'Female', native: 'India' }).toArray();
console.log('Female Users Living in India:', femaleInIndia);

// Users who are more than 25 years old
const usersAbove25 = await User.find({ age: { $gt: 25 } }).toArray();
console.log('Users Above 25:', usersAbove25);

// Users who are less than 50 years old and live in United States
const usersBelow50InUS = await User.find({ age: { $lt: 50 }, native: 'United States' }).toArray();
console.log('Users Below 50 in United States:', usersBelow50InUS);

// Total number of users who want to relocate to France (count only)
const usersToFranceCount = await User.countDocuments({ relocate_to: 'France' });
console.log('Total Users Wanting to Relocate to France:', usersToFranceCount);

// Total number of users who are from USA and want to relocate to Russia, sort them by age in ascending order
const usToRussiaUsers = await User.find({ native: 'United States', relocate_to: 'Russia' })
  .sort({ age: 1 }).toArray();
console.log('US Users Wanting to Relocate to Russia (Sorted by Age):', usToRussiaUsers);

// Get all users, sort them by total number of family members ASC and age DESC order
const sortedUsers = await User.find()
  .sort({ family_members: 1, age: -1 }).toArray();
console.log('All Users Sorted by Family Members ASC and Age DESC:', sortedUsers);

// Close connection
mongoose.connection.close();
