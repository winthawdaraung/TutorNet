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

        // Log the raw response for debugging
        console.log('Raw response:', response);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            return { 
                success: false, 
                error: 'Failed to fetch profile' 
            };
        }

        const data = await response.json();
        console.log('Profile data:', data); // Debug log

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

        // Log the FormData for debugging
        for (let pair of formDataObj.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
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
        console.log('Update response:', data); // Debug log

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update profile');
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
            error: error.message || 'Failed to update profile' 
        };
    }
};

export const declineStudentRequest = async (requestId) => {
    try {
      const response = await fetch(`/api/tutors/decline-request/${requestId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
    //   console.log(localStorage.getItem('token'));
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in declineStudentRequest:', error);
      return { success: false, error: error.message };
    }
};

export const acceptStudentRequest = async (requestId, formData) =>{
    console.log("Inside acceptStudentRequest:");
    console.log("RequestID:", requestId);
    console.log("formData:", formData);
    try {
        const response = await fetch(`/api/tutors/accept-request/${requestId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(formData)
        });
      //   console.log(localStorage.getItem('token'));
        
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error in acceptStudentRequest:', error);
        return { success: false, error: error.message };
      }
}