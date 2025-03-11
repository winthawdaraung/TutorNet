// handle/review.js - Complete implementation

// Submit a review for a tutor
export const submitReview = async (reviewData) => {
  try {
    const { tutorId, rating, comment } = reviewData;
    //console.log('Tutor ID:', tutorId); // Log tutorId here
    const token = localStorage.getItem('token'); // Retrieve the token
    const url = `/api/reviews${tutorId}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ rating, comment })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit review');
    }
    
    return { success: true, data };  // Standardized return format
  } catch (error) {
    console.error('Error submitting review:', error);
    return { success: false, error: error.message };  // Return the error message
  }
};

// Get all reviews for a specific tutor
export const getTutorReviews = async (tutorId) => {
  try {
    if (!tutorId) {
      throw new Error('Tutor ID is required to fetch reviews');
    }
    console.log(`Fetching reviews for tutor ID: ${tutorId}`); // Debug log
    const response = await fetch(`/api/reviews/${tutorId}`);
    console.log(`Response status: ${response.status}`); // Debug log
    
    const data = await response.json();
    console.log('Fetched reviews:', data); // Debug log
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch reviews');
    }
    
    return { success: true, reviews: data.reviews || [] };  // Ensure reviews array
  } catch (error) {
    console.error('Error fetching tutor reviews:', error);
    return { success: false, error: error.message, reviews: [] };  // Return empty array if there's an error
  }
};

// Get tutor by ID
export const getTutorById = async (tutorId) => {
  try {
    if (!tutorId) {
      throw new Error('Tutor ID is required to fetch tutor details');
    }
    const token = localStorage.getItem('token');
    console.log(`Fetching tutor details for ID: ${tutorId}`); // Debug log
    
    const response = await fetch(`/api/tutors/${tutorId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    console.log('Fetched tutor data:', data); // Debug log
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch tutor');
    }
    
    return { success: true, data: data.tutor };
  } catch (error) {
    console.error('Error fetching tutor:', error);
    return { success: false, error: 'Failed to fetch tutor' };
  }
};