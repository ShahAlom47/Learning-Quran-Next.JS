import { getUserCollection } from "@/src/lib/database/db_collections";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const usersCollection = await getUserCollection();

                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                // Check if user exists
                const existingUser = await usersCollection.findOne({ email: credentials.email });
                if (!existingUser) {
                    throw new Error("User does not exist");
                }

                // Compare password
                const isValid = await bcrypt.compare(credentials.password, existingUser.password);
                if (!isValid) {
                    throw new Error("Invalid password");
                }

                // Return user data
                return {
                    id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email
                };
            }
        })
    ],

  
};

export default authOptions;
