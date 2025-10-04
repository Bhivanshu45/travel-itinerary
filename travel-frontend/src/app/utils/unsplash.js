import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

export async function getCityImageUrl(city) {
  try {
    // Check if access key is available
    if (!process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY) {
      console.warn("Unsplash access key not configured");
      return null;
    }

    // Add timeout to the API call
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Unsplash API timeout")), 8000)
    );

    const apiCall = unsplash.search.getPhotos({
      query: city,
      orientation: "landscape",
      perPage: 1,
    });

    const result = await Promise.race([apiCall, timeoutPromise]);

    if (
      result?.response?.results &&
      result.response.results.length > 0 &&
      result.response.results[0].urls?.regular
    ) {
      return result.response.results[0].urls.regular;
    }
    return null;
  } catch (err) {
    console.warn("Unsplash API error:", err.message);
    return null;
  }
}
