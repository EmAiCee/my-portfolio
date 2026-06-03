const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://algonimusa202_db_user:vGFq5mBnzda260w8@cluster0.4byeyis.mongodb.net/portfolio?';

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  role: String,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function createAdmin() {
  await mongoose.connect(MONGODB_URI);
  
  const adminExists = await User.findOne({ email: 'algonimusa202@gmail.com' });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('Mic2002.', 10);
    await User.create({
      email: 'algonimusa202@gmail.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    });
    console.log('Admin user created!');
    console.log('Email: algonimusa202@gmail.com');
    console.log('Password: think');
  } else {
    console.log('Admin already exists');
  }
  
  await mongoose.disconnect();
}

createAdmin();