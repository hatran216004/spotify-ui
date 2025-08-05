import { Clerk } from '@clerk/clerk-js';

export const clerk = new Clerk(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

export async function initClerk() {
  if (!clerk.loaded) await clerk.load();
}

export async function getClerkToken() {
  await initClerk();
  return await clerk.session?.getToken();
}
