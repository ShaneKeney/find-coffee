import { CoffeeStore } from "../pages";

const FOURSQUARE__BASE_URL = "https://api.foursquare.com/v3/places/search";

const getUrlForCoffeeStores = (
  lat: number,
  lng: number,
  query: string,
  limit: number
) => {
  const url = `${FOURSQUARE__BASE_URL}?query=${query}&ll=${lat}%2C${lng}&limit=${limit}`;
  return url;
};

export const fetchCoffeeStores = async (): Promise<CoffeeStore[]> => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${process.env.FOURSQUARE_API_KEY}`,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(40.7128, -74.006, "coffee", 10),
    options
  );
  if (!response) return [];
  const data = await response.json();
  return data.results;
};
