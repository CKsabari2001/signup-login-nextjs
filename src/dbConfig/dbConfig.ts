import mongoose from "mongoose";

export async function connect() {
  try {
    const uri = process.env.MONGO_URI!;

    await mongoose.connect(uri, { dbName: "signup-login-app" });
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Mongoose connected successfully");
    });

    connection.on("error", (err) => {
      console.log("Mongoose connection error" + err);
      process.exit();
    });
  } catch (err) {
    console.log("something went wrong", err);
  }
}
