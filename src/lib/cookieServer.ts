import { cookies } from "next/headers";

export async function getCookieServer() {
    const cookieStore = cookies();  // sem await
    const token = cookieStore.get("session")?.value;
    return token || null;
}
