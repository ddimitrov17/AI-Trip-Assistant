export async function apiAccess() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/get-access`);
    const data=await response.json();
    console.log(data.error);
    if (!response.ok) {
        throw new Error(data.error);
    }
    return response;
}
