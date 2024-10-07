/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";

import { Authoptions } from "@/src/config/nextauth.config";

const handler = NextAuth(Authoptions);

export { handler as GET, handler as POST };
