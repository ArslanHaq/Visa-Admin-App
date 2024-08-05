// import { getServerSession } from "next-auth";
// import { authOptions } from "@/utils/AuthOptions";
// import { ClientSession } from "@/constants/constants";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
async function getHeaders() {
  // const session: any = await getServerSession(authOptions);
  const session = {
    user: {
      accessToken: "",
    },
  };
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session?.user.accessToken}`,
  };
}

// POST Request
export const post = async (path: any, data: any) => {
  const url = `${BACKEND_URL}/${path}`;
  const headers = await getHeaders();
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return response;
};

// GET Request
export const get = async (path: any) => {
  const url = `${BACKEND_URL}/${path}`;
  const headers = await getHeaders();
  const response = await fetch(url, {
    method: "GET",
    headers,
  });
  return response;
};

// PUT Request
export const put = async (path: any, data: any) => {
  const url = `${BACKEND_URL}/${path}`;
  const headers = await getHeaders();

  const response = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });
  return response;
};

// DELETE Request
export const remove = async (path: any, body?: any) => {
  const url = `${BACKEND_URL}/${path}`;
  const headers = await getHeaders();

  const response = await fetch(url, {
    method: "DELETE",
    headers,
    body: JSON.stringify(body),
  });
  return response;
};

// PATCH Request
export const patch = async (path: any, data: any) => {
  const url = `${BACKEND_URL}/${path}`;
  const headers = await getHeaders();

  const response = await fetch(url, {
    method: "PATCH",
    headers,
    body: JSON.stringify(data),
  });
  return response;
};
