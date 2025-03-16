# Third Eye

A web application that helps users identify products through image recognition and compare prices across different e-commerce platforms.

## Features

- Screen capture with area selection
- Image upload and recognition using Nyckel API
- Price comparison across Amazon, Meesho, and Myntra
- Trending products based on user scans
- Personalized recommendations
- Instagram authentication
- Friends' activity feed

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- NextAuth.js
- Nyckel API for image recognition
- Zustand for state management

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/imankit1234/Third-Eye.git
cd Third-Eye
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your API keys:
```env
NEXT_PUBLIC_NYCKEL_API_KEY=your_nyckel_api_key
NEXT_PUBLIC_NYCKEL_FUNCTION_ID=your_nyckel_function_id
INSTAGRAM_CLIENT_ID=your_instagram_client_id
INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your_nextauth_secret
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3001](http://localhost:3001) in your browser.

## Setting up Instagram Authentication

1. Create a Meta Developer account
2. Create a new app in the Meta Developer Console
3. Configure Instagram Basic Display
4. Get your Instagram Client ID and Client Secret
5. Add them to your `.env.local` file

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. 