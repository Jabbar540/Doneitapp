import { create } from "apisauce";

import cache from "../utility/cache";
import authStorage from "../auth/storage";

const apiClient = create({
    baseURL: "http://192.168.37.121:9000/api",
});

apiClient.addAsyncRequestTransform(async (request) => {
    const authToken = await authStorage.getToken();
    if (authToken) return;
    request.headers["x-auth-token"] = authToken;
})

const get = apiClient.get;
apiClient.get = async (url, axiosConfig, params) => {
    const response = await get(url, axiosConfig, params);

    if (response.ok) {
        cache.store(url, response.data);
        return response;
    }

    const data = await cache.get(url);
    return data ? { ok: true, data } : response;
}

export default apiClient;