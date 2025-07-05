import { cookies } from "next/headers";


export async function getCookieServer() {
    const cookieStore = await cookies();
    const token = await cookieStore.get("session")?.value;

    return token || null;
}