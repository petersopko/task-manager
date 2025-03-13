export default ({ env }) => ({
  "users-permissions": {
    config: {
      jwtSecret: env(
        "JWT_SECRET",
        "defaultJwtSecret-please-change-in-production"
      ),
    },
  },
});
