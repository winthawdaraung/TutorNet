// Common API handlers for both students and tutors

export const forgotPassword = async (email) => {
    try {
        const response = await fetch('/api/users/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to send reset email');
        }

        return {
            success: true,
            message: data.message
        };
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        return {
            success: false,
            error: error.message || 'Failed to send reset email'
        };
    }
};

export const resetPassword = async (token, newPassword) => {
    try {
        const response = await fetch('/api/users/reset-password/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, newPassword }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to reset password');
        }

        return {
            success: true,
            message: data.message,
            role: data.role
        };
    } catch (error) {
        console.error('Error in resetPassword:', error);
        return {
            success: false,
            error: error.message || 'Failed to reset password'
        };
    }
};

export const login = async (email, password) => {
    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        return {
            success: true,
            user: data.user,
            token: data.token
        };
    } catch (error) {
        console.error('Error in login:', error);
        return {
            success: false,
            error: error.message || 'Login failed'
        };
    }
};

export const logout = async () => {
    try {
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Logout failed');
        }

        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        return {
            success: true,
            message: data.message
        };
    } catch (error) {
        console.error('Error in logout:', error);
        return {
            success: false,
            error: error.message || 'Logout failed'
        };
    }
};

// Add a utility function to check if user is logged in
export const isLoggedIn = () => {
    return !!localStorage.getItem('token');
};

// Add a utility function to get current user data
export const getCurrentUser = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
};

export const getRequestData = async () => {
    try {
        const response = await fetch('/api/students/get-requests', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to get requests');
        }

        return {
            success: true,
            requests: data.requests
        };
    } catch (error) {
        console.error('Error in getRequestData:', error);
        return {
            success: false,
            error: error.message || 'Failed to get requests'
        };
    }
};