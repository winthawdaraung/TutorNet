export const handleLogin = async (email, password) => {
    try {
        const response = await fetch(`/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),  
        }); 

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, error: errorData.message || 'Login failed' };
        }

        const data = await response.json();
        
        if (data.success) {
            return { success: true, data: data.user };
        } else {
            return { success: false, error: data.message };
        }
    } catch (error) {
        console.error("Error logging in", error);
        return { success: false, error: "An error occurred during login. Please try again." };
    }
};

export const logout = async () => {
    try {
        const response = await fetch(`/api/logout`, { method: "POST" });
        return response.json();
    } catch (error) {
        console.error("Error logging out", error);
        return { success: false, error: error.message };
    }
};

export const googleLogin = async () => {
    try {
        const response = await fetch(`/api/google-login`, { method: "POST" });
        return response.json();
    } catch (error) {
        console.error("Error logging in with Google", error);
        return { success: false, error: error.message };
    }
}


