This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Optional environment variables:

- `OPENAI_MODEL` — override the model (default `gpt-3.5-turbo`).
- `OPENAI_MAX_TOKENS` — max tokens per request (default `600`).
- `AI_RATE_LIMIT` — number of allowed requests per IP per window (default `12`).
- `AI_RATE_WINDOW_MS` — window size in milliseconds for rate limiting (default `60000`).

Notes:
- The in-memory rate limiter is suitable for local development only. For production, use a shared store (Redis) or an API gateway with rate limiting.
- Never commit your `OPENAI_API_KEY` to source control; use platform secrets or environment variables.

Low-quota suggestions

If your OpenAI account has limited quota, try these values in `.env.local` to reduce usage and enable client retries/backoff (already implemented in the dashboard UI):

```env
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-3.5-turbo
OPENAI_MAX_TOKENS=150
AI_RATE_LIMIT=4
AI_RATE_WINDOW_MS=60000
USE_MOCK_AI=false
```

If you prefer the UI to return canned responses while you sort billing, set `USE_MOCK_AI=true` and I can add a simple mock mode that bypasses OpenAI calls.
