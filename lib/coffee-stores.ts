import { CoffeeStore, FS_CoffeeStore } from "../pages";
import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY as string,
});

const FOURSQUARE__BASE_URL = "https://api.foursquare.com/v3/places/search";

const getUrlForCoffeeStores = (
  latLong: string = "40.7,-74",
  query: string,
  limit: number
) => {
  const url = `${FOURSQUARE__BASE_URL}?query=${query}&ll=${latLong}&limit=${limit}`;
  return url;
};

export const fetchCoffeeStores = async (
  latLong: string = "40.7,-74",
  limit: number = 10
): Promise<CoffeeStore[]> => {
  const photos = await fetchCoffeeStoreImages();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY}`,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(latLong, "coffee", limit),
    options
  );
  if (!response) return [];
  const data = await response.json();
  const coffeeStores = data.results?.map(
    (result: FS_CoffeeStore, index: number) => {
      const { fsq_id, name, location } = result;
      return {
        id: fsq_id,
        name: name,
        address: location.address,
        neighborhood:
          location.neighborhood?.length > 0 ? location.neighborhood[0] : "",
        imgUrl: photos?.length > 0 ? photos[index] : null,
      };
    }
  );
  return coffeeStores || [];
};

export const fetchCoffeeStoreImages = async () => {
  const response = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 30,
    orientation: "portrait",
  });

  const unsplashResults = response.response?.results?.map(
    (result) => result.urls["small"]
  );

  return unsplashResults || [];
};
