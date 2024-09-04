import axios from "axios";

export const app = axios.create({
  baseURL: "https://deckofcardsapi.com/api/deck",
});
