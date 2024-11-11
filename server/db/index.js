import mongoose from "mongoose";

const uri = "mongodb+srv://chatapp:chatapp5060@cluster0.jr4x9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const dbConnection = () => {
  mongoose
    .connect(uri)
    .then(() => console.log("DB Connected"))
    .catch((e) => console.log("error while connecting the Db", e));
};

export default dbConnection
