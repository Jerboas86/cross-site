# Adapter-vercel: Cross-site POST form submissions are forbidden

## Bug report

with `vite preview`, form action requests are blocked with message `Cross-site POST form submissions are forbidden`.

requests are blocked when using:

- `@vitejs/plugin-basic-ssl` plugin
- or `vite-plugin-mkcert` plugin

See bug in plugin-basic-ssl branch

## Solution:

form action requests are accepted when using your own certificate in TLS only mode.

1. Create your own certificate with mkcert

```bash
mkdir cert
cd cert
mkcert -key-file key.pem -cert-file cert.pem localhost
```

2. Config vite server to use your certificate in `vite.config.ts`

```typescript
export default defineConfig({
	server: {
		https: {
			key: fs.readFileSync(`${__dirname}/cert/key.pem`),
			cert: fs.readFileSync(`${__dirname}/cert/cert.pem`)
		},
	},
    [...]
});
```

3. Downgrade tls+http2 to tls only in `vite.config.ts` (not working with tls+http2):

```typescript
export default defineConfig({
	server: {
		https: {
			key: fs.readFileSync(`${__dirname}/cert/key.pem`),
			cert: fs.readFileSync(`${__dirname}/cert/cert.pem`)
		},
        // add proxy property
        proxy:{}
	},
    [...]
});
```

4. Launch https server with `vite preview` command (not working with `vite preview --https`)

## Alternative solution:

**WARNING**: this solution introduces security vulnerability in your code. This should not be used in production.\
`@vitejs/plugin-basic-ssl` and `vite-plugin-mkcert` plugins can be used when CSRF protection is disabled.

1. Disable CSRF protection in `svelte.config.js`:

```javascript
const config = {
	// [...]
	kit: {
		//[...]
		csrf: {
			checkOrigin: false
		}
	}
};
```
