# AWS Regions Globe (GitHub + Vercel)
A simple React single-file app that renders a globe and plots AWS regions with a green score and carbon production. Built to be pushed to GitHub and deployed to Vercel. Uses `react-globe.gl` (three-globe) and local JSON data for regions.

## What's included
- `package.json` (dependencies + scripts)
- `src/App.jsx` — main React component (single-file app)
- `src/aws_regions.json` — sample AWS regions with latitude/longitude and mock green/carbon scores
- `public/index.html`

## How to use
1. Create a new repository on GitHub.
2. Commit files.
3. Sign into Vercel, import the GitHub repo, set framework to `Create React App` or `Other` and deploy (Vercel auto-detects). No server required.

## Replace sample data with real data
- `src/aws_regions.json` contains mock `green_score` (0-100) and `carbon_tonnes_per_year` fields. Replace or augment those values with your data source (CSV, API) and redeploy.
