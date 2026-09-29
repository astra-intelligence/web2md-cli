# web2md-cli

Convert any URL to clean Markdown — perfect for LLM context ingestion, AI training data, and content extraction.

## Usage

```bash
npx web2md-cli https://example.com
```

Or install globally:

```bash
npm install -g web2md-cli
web2md-cli https://example.com
```

### Premium

For higher rate limits and priority processing:

```bash
npx web2md-cli https://example.com --premium
```

Get premium at: https://grantshatz.gumroad.com/l/mpkqyq

## API

This CLI wraps the Web2MD API at `http://localhost:9999/api/convert`.