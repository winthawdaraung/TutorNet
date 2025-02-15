export const registerTutor = async (formData) => {
    try {
        const response = await fetch(`/api/tutors/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.success) {
            return { success: true, data: data.tutor };
        } else {
            return { success: false, error: data.message };
        }
    } catch (error) {
        console.error("Error registering tutor", error);
        return { success: false, error: error.message };
    }
};