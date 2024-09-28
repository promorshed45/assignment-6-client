/* eslint-disable @typescript-eslint/no-explicit-any */
import { Authoptions } from "@/src/config/nextauth.config";
import NextAuth from "next-auth";


const handler = NextAuth(Authoptions);

export { handler as GET, handler as POST }