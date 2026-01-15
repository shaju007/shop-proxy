# Shop Proxy Server

A simple proxy server to enable custom GPT Actions with dynamic shop domains.

## Setup

```bash
cd shop-proxy
npm install
npm start
```

## Deploy Options

### 1. **Vercel** (Easiest, Free)
```bash
npm i -g vercel
vercel
```

### 2. **Railway** (Free tier)
- Connect GitHub repo
- Auto-deploys

### 3. **Render** (Free tier)
- Connect GitHub repo
- Auto-deploys

### 4. **Heroku**
```bash
heroku create your-shop-proxy
git push heroku main
```

## Usage

Once deployed, your proxy will be at:
```
https://your-proxy-url.com/shop?domain=skinny.beyondshop.cloud
```

## Custom GPT Configuration

1. Copy the content from `openapi.yaml`
2. In your custom GPT → Actions → Paste the schema
3. Replace `https://your-proxy-domain.com` with your actual deployed URL
4. Save and test

## Example Requests

```bash
# Get shop info for skinny.beyondshop.cloud
curl "https://your-proxy-url.com/shop?domain=skinny.beyondshop.cloud"

# Get shop info for fatty.pm.epages.com
curl "https://your-proxy-url.com/shop?domain=fatty.pm.epages.com"
```
