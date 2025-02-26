export const handleLogin = async (email, password) => {
    try {
        const response = await fetch(`/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // Important for cookies
            body: JSON.stringify({ email, password }),  
        }); 

        const data = await response.json();
        
        if (!response.ok) {
            return { success: false, error: data.message || 'Login failed' };
        }

        if (data.success) {
            // Store token in localStorage for easy access
            localStorage.setItem('token', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));
            
            return { success: true, user: data.user, token: data.token };
        } else {
            return { success: false, error: data.message };
        }
    } catch (error) {
        console.error("Error logging in", error);
        return { success: false, error: "An error occurred during login. Please try again." };
    }
};

export const handleLogout = async () => {
    try {
        const response = await fetch(`/api/logout`, { 
            method: "POST",
            credentials: "include", // Important for cookies
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
        });
        
        const data = await response.json();
        
        // Clear token regardless of server response
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        
        return data;
    } catch (error) {
        console.error("Error logging out", error);
        // Still remove token on error
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        return { success: false, error: error.message };
    }
};

// Add a utility function to check if user is logged in
export const isLoggedIn = () => {
    return !!localStorage.getItem('token');
};

// Add a utility function to get current user data
export const getCurrentUser = () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
};