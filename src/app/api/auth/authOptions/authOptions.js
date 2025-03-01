import { getUserCollection } from "@/src/lib/database/db_collections";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
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
                    id: existingUser?._id,
                    name: existingUser?.name,
                    email: existingUser?.email,
                    role: existingUser?.role || null,
                    photoUrl: existingUser?.photoUrl || null
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
                token.photoUrl = user.photoUrl;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.role = token.role;
                session.user.photoUrl = token.photoUrl;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login", 
        error: '/login',   // error handling location
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60  /// ৩০ দিন
    },
    secret: process.env.NEXTAUTH_SECRET, // Ensure you set this in your .env file
};

export default authOptions;
