module.exports = {
  apps: [
    {
      name: "client",
      cwd: "./client",
      script: "npm",
      args: "run dev",
      watch: true,
      env: {
        NODE_ENV: "development",
      },
    },
    {
      name: "server",
      cwd: "./server",
      script: "npm",
      args: "run dev",
      watch: true,
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
