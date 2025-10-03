import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

export async function getCityImageUrl(city) {
  try {
    const result = await unsplash.search.getPhotos({
      query: city,
      orientation: "landscape",
      perPage: 1,
    });
    if (
      result?.response?.results &&
      result.response.results.length > 0 &&
      result.response.results[0].urls?.regular
    ) {
      return result.response.results[0].urls.regular;
    }
    return null;
  } catch (err) {
    return null;
  }
}
