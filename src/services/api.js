import axios from "axios";
import { encode } from "base-64";

const getToken = await fetch("https://accounts.spotify.com/api/token", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${encode(
      `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${
        import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
      }`
    )}`,
  },
  body: "grant_type=client_credentials",
});

const token = await getToken.json();

const api = axios.create({
  baseURL: "https://api.spotify.com/v1/",
  headers: {
    Authorization: `Bearer ${token.access_token}`,
  },
});

export default api;
