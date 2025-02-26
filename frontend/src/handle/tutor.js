export const registerTutor = async (formData) => {
    try {
        const response = await fetch(`/api/tutors/register`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        
        if (!response.ok) {
            return { 
                success: false, 
                error: data.message || 'Registration failed' 
            };
        }

        if (data.success) {
            return { success: true, data: data.tutor };
        } else {
            return { success: false, error: data.message };
        }
    } catch (error) {
        console.error("Error registering tutor", error);
        return { success: false, error: error.message };
    }
}

export const getTutorProfile = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/tutors/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            return { 
                success: false, 
                error: data.message || 'Failed to fetch profile' 
            };
        }

        return { 
            success: true, 
            data: data.tutor 
        };
    } catch (error) {
        console.error('Error fetching tutor profile:', error);
        return { 
            success: false, 
            error: 'Failed to fetch profile' 
        };
    }
};

export const updateTutorProfile = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        
        // Create FormData object
        const formDataObj = new FormData();
        
        // Add all text fields
        for (const key in formData) {
            if (key !== 'selectedImage' && key !== 'cvFile') {
                if (key === 'availability' || key === 'subjectsOffered') {
                    // Convert objects to JSON strings
                    formDataObj.append(key, JSON.stringify(formData[key]));
                } else {
                    formDataObj.append(key, formData[key]);
                }
            }
        }
        
        // Add files if they exist
        if (formData.selectedImage) {
            formDataObj.append('profileImage', formData.selectedImage);
        }
        
        if (formData.cvFile) {
            formDataObj.append('cvFile', formData.cvFile);
        }
        
        const response = await fetch('/api/tutors/profile', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: formDataObj
        });
        
        const data = await response.json();

        if (!response.ok) {
            return { 
                success: false, 
                error: data.message || 'Failed to update profile' 
            };
        }
        
        return { 
            success: true, 
            data: data.tutor 
        };
    }
    catch (error) {
        console.error('Error updating tutor profile:', error);
        return { 
            success: false, 
            error: 'Failed to update profile' 
        };
    }
};