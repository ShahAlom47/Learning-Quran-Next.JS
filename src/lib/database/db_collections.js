const { default: clientPromise } = require("./db_connection");


export const getUserCollection = async () => {
    const client = await clientPromise;
    const db = client.db("learning_quran");
    return db.collection("users");
  };

export const getBookCollection = async () => {
    const client = await clientPromise;
    const db = client.db("learning_quran");
    return db.collection("users");
  };




