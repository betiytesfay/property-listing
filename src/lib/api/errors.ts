import axios from "axios";

export class ApiError extends Error {
  readonly status: number;
  readonly data: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export function getErrorMessage(error: unknown, fallback = "Something went wrong. Please try again."): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "Cannot reach the server. Make sure the backend is running on port 8000, then restart the Next.js dev server.";
    }

    if (error.response.status >= 500) {
      return "Server error. The API is reachable but failed—often because PostgreSQL is not running. Start the database (see property-management-be/SETUP.md) and try again.";
    }

    const detail = error.response?.data;

    if (typeof detail === "string") {
      return detail;
    }

    if (detail && typeof detail === "object" && "detail" in detail) {
      const apiDetail = detail.detail;
      if (typeof apiDetail === "string") {
        return apiDetail;
      }
      if (Array.isArray(apiDetail) && apiDetail.length > 0) {
        const first = apiDetail[0];
        if (typeof first === "object" && first !== null && "msg" in first) {
          return String(first.msg);
        }
      }
    }

    return error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}
