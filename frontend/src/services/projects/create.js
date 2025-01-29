import axios from "axios";

const createProject = async (data) => {
    try {
        const response = await axios.post("/api/projects/create", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export default createProject;