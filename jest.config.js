const config = {
  verbose: true,
  collectCoverageFrom: ["**/*.{js}", "!**/node_modules/**", "!**/vendor/**"],
  transform: {
    "^.+\\.(js)$": "babel-jest",
  },
};

export default config;
