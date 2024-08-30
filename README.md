# LinkIt

A full stack application that allows users to create and manage their own custom link pages. This project is built using Node.js, Express, Prisma, React, and PostgreSQL.

## Features

- User authentication and authorization
- Create, read, update, and delete links
- Responsive design for mobile and desktop
- Custom URL slugs for user profiles

## Project Structure

This project is set up as a monorepo with the following structure:

```bash
.
├── client/          # React frontend
├── server/          # Node.js backend
├── ecosystem.config.js  # PM2 configuration
└── README.md
```

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or yarn
- PostgreSQL
- PM2 (for running the application locally)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sarthakkimtani/linkit-app.git
   cd linkit-app
   ```

2. Install dependencies for both client and server:

   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

3. Set up environment variables:

   - In the `server/` directory, create a `.env` file based on `.env.example`
   - Configure your PostgreSQL connection string and other necessary variables

4. Set up the database:
   ```bash
   cd server
   npx prisma migrate dev
   ```

## Usage

To run the application locally using PM2:

1. Ensure you're in the root directory of the project
2. Run the following command:
   ```bash
   pm2 start
   ```
   This will start both the frontend and backend servers.

- The frontend will be available at: `http://localhost:5173`
- The backend API will be available at: `http://localhost:3000`

To stop the application:

```bash
pm2 stop all
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contact

For any questions or inquiries, please contact repository owner.
