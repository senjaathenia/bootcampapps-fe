// 🚀 Modern API client using native fetch with better error handling
// Based on Next.js 15 best practices and WHATWG standards
// Source: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002";

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number>;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private buildURL(
    endpoint: string,
    params?: Record<string, string | number>
  ): string {
    // ✨ Using modern URL constructor instead of deprecated url.parse()
    const url = new URL(endpoint, this.baseURL);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value));
        }
      });
    }

    return url.toString();
  }

  async get<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<{ data: T }> {
    const { params, ...fetchOptions } = options;
    const url = this.buildURL(endpoint, params);

    console.log("🔍 ApiClient Debug:", {
      endpoint,
      url,
      baseURL: this.baseURL,
      environment: process.env.NEXT_PUBLIC_API_URL,
    });

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...fetchOptions.headers,
        },
        mode: "cors", // Add CORS mode
        signal: controller.signal,
        ...fetchOptions,
      });

      clearTimeout(timeoutId);

      console.log("✅ Response status:", response.status, response.statusText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("📦 Response data:", responseData);

      // Handle wrapped response (backend returns {message, data})
      const data = responseData.data || responseData;
      return { data };
    } catch (error: any) {
      console.error("❌ API Error Details:", {
        error,
        url,
        endpoint,
        message: error?.message || error || "Unknown error",
        stack: error?.stack,
      });
      throw error;
    }
  }

  async post<T>(
    endpoint: string,
    body?: unknown,
    options: FetchOptions = {}
  ): Promise<{ data: T }> {
    const url = this.buildURL(endpoint, options.params);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        mode: "cors", // Add CORS mode
        body: body ? JSON.stringify(body) : undefined,
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      // Handle wrapped response (backend returns {message, data})
      const data = responseData.data || responseData;
      return { data };
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }
}

const apiClient = new ApiClient(BASE_URL);

export default apiClient;
