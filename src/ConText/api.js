import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7174/",
    timeout: 5000,
});

const callApi = async (endpoint, params, method = "GET", data = null) => {
    try {
        const response = await api.request({
            url: endpoint,
            method: method,
            data: {
                employeeCode: "0003",
                password: "123",
            },
        });
        console.log(response);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export default callApi;
