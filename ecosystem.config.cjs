module.exports = {
  apps: [
    {
      name: 'GT Firmware Update Website',
      script: 'pnpm run start',
      env: {
        PORT: '3015',
      },
    },
  ],
}
