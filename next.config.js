module.exports = {
  images: {
    domains: ["res.cloudinary.com"],
  }, //need this to get images from that domain
  env: {
    NEXT_PUBLIC_MAPBOX_API_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN,
    NEXT_PUBLIC_GOOGLE_MAP_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};
