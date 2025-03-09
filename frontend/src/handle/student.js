export const registerStudent = async (formData) => {
    try {
        const response = await fetch(`/api/students/register`, {
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
            console.log("Student registered successfully", data.student);
            return { success: true, data: data.student };
        } else {
            console.error("Error registering student", data.message);
            return { success: false, error: data.message };
        }
    } catch (error) {
        // console.error("Error registering student", error);
        console.log("Error registering student", error);
        return { success: false, error: error.message };
    }
}

export const getStudentProfile = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/students/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            return { 
                success: false, 
                error: errorText || 'Failed to fetch profile' 
            };
        }

        const data = await response.json();
        console.log('Profile data:', data); // Debug log

        return { 
            success: true, 
            data: data.student 
        };
    }
    catch (error) {
        console.error('Error fetching student profile:', error);
        return { 
            success: false, 
            error: error.message 
        };
    }
}

export const updateStudentProfile = async (formData) => {
    try {
        const token = localStorage.getItem('token');

        // Make sure we're sending FormData
        if (!(formData instanceof FormData)) {
            throw new Error('FormData is required');
        }

        // Log FormData contents for debugging
        for (let pair of formData.entries()) {
            console.log('FormData entry:', pair[0], pair[1]);
        }

        const response = await fetch('/api/students/profile', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
                // Don't set Content-Type header when sending FormData
            },
            credentials: 'include',
            body: formData
        });

        const data = await response.json();
        console.log('Update response:', data);

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update profile');
        }

        return { 
            success: true, 
            data: data.student 
        };
    } catch (error) {
        console.error('Error updating student profile:', error);
        return { 
            success: false, 
            error: error.message || 'Failed to update profile' 
        };
    }
}

export const getTutorProfile = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/students/tutor-profile/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        }); 

        const data = await response.json();
        console.log('Tutor profile response:', data);

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch tutor profile');
        }

        return { 
            success: true, 
            tutor: data.tutor
        };
    }
    catch (error) {
        console.error('Error fetching tutor profile:', error);
        return { 
            success: false, 
            error: error.message || 'Failed to fetch tutor profile'
        };
    }
}

export const sendBookingRequest = async (tutorId, bookingrequest) => {
    let token;
    try {
      const response = await fetch(`api/students/bookings:id/${tutorId}`, { //fetch from the student booking view
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(bookingrequest),
      });
  
      const result = await response.json();
      
      return result;
    } catch (error) {
      console.error("Error sending booking request:", error);
      return { success: false, error: "Error sending request" };
    }
  };