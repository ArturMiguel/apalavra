import mongoose from "mongoose";

export class DbConnection {
  static async getConnection() {
    if (mongoose.connection.readyState == 0) {
      await mongoose.connect(process.env.MONGODB_CONNECT_URL);
    }
    return mongoose.connection;
  }
}