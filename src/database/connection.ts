import mongoose from 'mongoose';

if (mongoose.connection.readyState == 0) {
  mongoose.connect(process.env.MONGODB_CONNECT_URL, {});
}

const db = mongoose.connection;

db.on('error', (err) => {
  console.log('Connection error with mongoose', err);
});
db.once('open', function () {
  console.log('Connection estabilished with mongoose');
});

export default mongoose;