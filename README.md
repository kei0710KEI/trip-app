# Traveler - Travel Planning Application

## Overview

Traveler is a modern travel planning application built with Next.js and TypeScript. It leverages Google Places API and Generative AI to provide users with personalized travel experiences.

## Key Features

- Google Account Authentication
- Destination Search and Recommendations
- AI-Powered Travel Plan Generation
- Responsive Design
- Dark Mode Support

## Tech Stack

- **Framework**: Next.js 15.2.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Authentication
- **APIs**:
  - Google Places API
  - Google Generative AI
- **UI Components**:
  - Radix UI
  - Lucide React
  - React Icons

## Setup Instructions

1. Clone the repository

```bash
git clone [repository-url]
cd traveler
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables
   Create a `.env.local` file and set the following environment variables:

```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

4. Start the development server

```bash
npm run dev
```

## Available Scripts

- `npm run dev`: Start development server (using Turbopack)
- `npm run build`: Create production build
- `npm run start`: Start production server
- `npm run lint`: Run code linting

## Project Structure

```
traveler/
├── src/              # Source code
├── public/           # Static files
├── components/       # React components
└── styles/          # Stylesheets
```

## License

This project is licensed under a private license.

## Contributing

Contributions to the project are welcome. Before submitting a pull request, please follow these steps:

1. Fork this repository
2. Create a new branch
3. Commit your changes
4. Create a pull request

## Support

If you encounter any issues or have questions, please create an Issue.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```

```
