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
