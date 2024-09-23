import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/AuthOptions";
import { ApiRoutes, Backend, BackendType } from "@/constants/constants";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const BACKEND_PROCESS_URL = process.env.NEXT_PUBLIC_BACKEND_PROCESS_URL;

async function getHeaders(includeRefreshToken = false) {
  const session: any = await getServerSession(authOptions);
  const headers: any = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session?.user.accessToken}`,
  };
  if (includeRefreshToken) {
    headers["Authorization"] = `Bearer ${session?.user.refreshToken}`;
  }

  return headers;
}
async function refreshAccessToken(isRefreshTokenCalled: boolean) {
  const session = await getServerSession(authOptions);
  const url = BACKEND_PROCESS_URL + "/" + ApiRoutes.REFRESHTOKEN;
  const headers = await getHeaders(true);
  const body = JSON.stringify({
    accessToken: session?.user.accessToken,
  });
  const response = await fetch(url, {
    method: "POST",
    headers,
    body,
  });

  return response;
}
// Function to handle HTTP requests with an interceptor for 403 responses
async function fetchWithInterceptor(url: string, options: any) {
  let response = await fetch(url, options);
  if (response.status === 401) {
    try {
      console.log("-----------refreshTokenCalled--------");
      let isRefreshTokenCalled = true;
      const refreshResponse = await refreshAccessToken(isRefreshTokenCalled);
      isRefreshTokenCalled = false;
      if (refreshResponse.ok) {
        const newAccessToken = await refreshResponse.json();
        options.headers[
          "Authorization"
        ] = `Bearer ${newAccessToken.data.accessToken}`;
        cookies().set("accessToken", ` ${newAccessToken.data.accessToken}`, {
          secure: true,
        });
        return await fetch(url, options);
      }
    } catch (e) {
      console.log("error", e);
    }
  }
  if (response.status === 401) {
    cookies().set("status", ` ${response.status}`, {
      secure: true,
    });
  }
  return response;
}

// Helper function to select the backend URL
const getBackendUrl = (backend: Backend) => {
  switch (backend) {
    case BackendType.BACKEND_1:
      return BACKEND_URL;
    case BackendType.BACKEND_2:
      return BACKEND_PROCESS_URL;
    default:
      throw new Error(`Unknown backend: ${backend}`);
  }
};

// POST Request
export const post = async (path: string, data: any, backend: Backend) => {
  const url = `${getBackendUrl(backend)}/${path}`;
  const headers = await getHeaders();
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };
  return fetchWithInterceptor(url, options);
};

// GET Request
export const get = async (path: string, backend: Backend) => {
  const url = `${getBackendUrl(backend)}/${path}`;
  const headers = await getHeaders();

  const options = {
    method: "GET",
    headers,
  };
  return fetchWithInterceptor(url, options);
};

// PUT Request
export const put = async (path: string, data: any, backend: Backend) => {
  const url = `${getBackendUrl(backend)}/${path}`;
  const headers = await getHeaders();
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  };
  return fetchWithInterceptor(url, options);
};

// DELETE Request
export const remove = async (path: string, body: any, backend: Backend) => {
  const url = `${getBackendUrl(backend)}/${path}`;
  const headers = await getHeaders();
  const options = {
    method: "DELETE",
    headers,
    body: JSON.stringify(body),
  };
  return fetchWithInterceptor(url, options);
};

// PATCH Request
export const patch = async (path: string, data: any, backend: Backend) => {
  const url = `${getBackendUrl(backend)}/${path}`;
  const headers = await getHeaders();
  const options = {
    method: "PATCH",
    headers,
    body: JSON.stringify(data),
  };
  return fetchWithInterceptor(url, options);
};
