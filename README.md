## Nginx Passthrough/Proxy Example

To expose your Epicbox Docker service securely on your own domain, use a simple nginx reverse proxy. This allows you to use SSL and a custom domain name.

### 1. Start Epicbox Docker with Custom Domain and Port

```sh
EPICBOX_DOMAIN=your-epicbox-domain.example NGINX_PORT=8888 docker compose up -d --build
```

### 2. Example nginx Reverse Proxy Configuration

Place this in your nginx config (e.g., `/etc/nginx/sites-available/epicbox.conf`):

```
server {
	server_name your-epicbox-domain.example www.your-epicbox-domain.example;

	root /var/www/html/epicbox/;
	index index.html index.htm;

	location / {
		proxy_set_header        Host $host;
		proxy_set_header        X-Real-IP $remote_addr;
		proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header        X-Forwarded-Proto $scheme;

		proxy_pass http://YOUR_SERVER_IP:8888;
		proxy_read_timeout  90;

		# WebSocket support
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";
	}

	access_log /var/log/nginx/epicbox.access.log;
	error_log /var/log/nginx/epicbox.error.log;

	listen 443 ssl;
	ssl_certificate /etc/letsencrypt/live/your-epicbox-domain.example/fullchain.pem;
	ssl_certificate_key /etc/letsencrypt/live/your-epicbox-domain.example/privkey.pem;
	include /etc/letsencrypt/options-ssl-nginx.conf;
	ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}
```

- Replace `your-epicbox-domain.example` with your actual domain.
- Replace `YOUR_SERVER_IP` with your server’s public IP or Docker host IP.
- Adjust SSL certificate paths as needed.

### 3. Reload nginx

```sh
sudo nginx -s reload
```

Now, your domain will securely proxy to your Epicbox Docker service!
# epicboxnodejs

Epicbox Relay Server for Epic Cash, built with Node.js and Rust.

## Docker Quick Start

1. **Clone the repository and navigate to the project folder:**
	```sh
	git clone <repo-url>
	cd epicboxnodejs-source
	```

2. **Build and start all services with Docker Compose:**
	```sh
	docker compose up -d --build
	```

3. **Custom configuration via environment variables:**
	You can override key settings at runtime:
	```sh
	EPICBOX_DOMAIN=my.domain.com NGINX_PORT=8888 docker compose up -d --build
	```
	- `EPICBOX_DOMAIN`: Sets the domain for epicbox services (default: epicbox.your-domain.com)
	- `EPICBOX_PORT`: Sets the port for epicbox services (default: 443)
	- `NGINX_PORT`: Sets the external port for nginx (default: 8080)

4. **Access the service:**
	- Open `http://localhost:8080` (or your chosen NGINX_PORT) in your browser.

5. **Scaling and failover:**
	- Two epicbox instances are started by default (epicbox1 and epicbox2).
	- nginx will automatically route requests to available instances.

## Configuration Reference

All major settings can be configured via environment variables or a `.env` file:

```
EPICBOX_DOMAIN=my.domain.com
EPICBOX_PORT=443
NGINX_PORT=8888
```

## Advanced

- MongoDB, nginx, and epicbox instances are all managed via `docker-compose.yml`.
- For custom setups, edit `docker-compose.yml` and `default_config.json` as needed.
