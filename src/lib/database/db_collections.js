import clientPromise from "./db_connection";

export const getUserCollection = async () => {
    const client = await clientPromise;
    return client.db("learning_quran").collection("users");
};

export const getBookCollection = async () => {
    const client = await clientPromise;
    return client.db("learning_quran").collection("books");
};
