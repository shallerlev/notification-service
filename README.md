# Test Assessment

Test assessment showcasing Notification Services application.

## Screencast

You can find deployed version at: https://notification-service-delta.vercel.app/

https://github.com/user-attachments/assets/b618363a-5ea7-42c8-a98c-0318f6d9d00a

## Get Started

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root of your project and add the necessary environment variables. You can reference the `.env.example`. Please, reach out for the actual values.

3. Run the development server:

```bash
npm run dev
```

4. Run the following command to start MongoDB:
```bash
docker-compose up -d
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Linting

- `npm run format` - automatically fixes code style according to prettier rules
- `npm run lint` - checks for eslint, prettier, and TS errors
- `npm run lint:js` - runs eslint check
- `npm run lint:types` - runs types check

CI/CD pipeline automatically runs linter checks on push and pull requests.
