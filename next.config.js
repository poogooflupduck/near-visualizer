module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/transactions/real-time",
        permanent: true,
      },
    ];
  },
};
