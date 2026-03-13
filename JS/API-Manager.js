export const CONTACT_API = async (url) => {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Can't connect to server.");
        }
        
        return await response.json();
        
    } catch (err) {
        console.error("Fetch Error:", err);
        throw err;
    }
};