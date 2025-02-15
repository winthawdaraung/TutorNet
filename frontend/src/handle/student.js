
export const registerStudent = async (formData) => {
    try {
        const res = await fetch("/api/students/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success) {
            return { success: true, data: data.student };
        } else {
            return { success: false, error: data.message };
        }
    } catch (error) {
        console.error("Error registering student", error);
        return { success: false, error: error.message };
    }
};
