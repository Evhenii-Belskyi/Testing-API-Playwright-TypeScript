import { APIRequestContext } from "@playwright/test";

export class Request {
  async get(
    request: APIRequestContext, 
    endpoint: string
  ) {
    const response = await request.get(endpoint, {
      headers: { Accept: "application/json" },
    });
    return response;
  }

  async post(
    request: APIRequestContext, 
    endpoint: string, 
    data: object
  ) {
    const response = await request.post("/booking", {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
    });
    return response;
  }

  async patch(
    request: APIRequestContext,
    endpoint: string,
    data: object,
    id: number
  ) {
    const response = await request.patch(`/booking/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: "token=abc123",
      },
      data: JSON.stringify(data),
    });
    return response;
  }

  async put(
    request: APIRequestContext, 
    endpoint: string, 
    data: object
  ) {
    const response = await request.put("/booking", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: "token=abc123",
      },
      data: JSON.stringify(data),
    });
    return response;
  }

  //How to do dymamic ID when uses this method?
  async delete(
    request: APIRequestContext, 
    endpoint: string, 
    id: number
  ) {
    try {
      const response = await request.delete(`/booking/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return response;
    } catch (error) {
      // You can handle the error here, e.g., by logging it, throwing a custom error, or returning a specific error response.
      console.error(`Error deleting booking with id ${id}:`, error);
      throw error;
    }
  }
}
