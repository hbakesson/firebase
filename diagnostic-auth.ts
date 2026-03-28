import { auth } from "./src/auth";

async function test() {
  console.log("Starting Auth Diagnostic...");
  try {
    // NextAuth v5 auth() can be called in any environment
    const session = await auth();
    console.log("Auth call successful.");
    console.log("Session:", JSON.stringify(session, null, 2));
  } catch (error: any) {
    console.error("❌ AUTH CRASH DETECTED:");
    console.error(error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

test();
