# Query for profiles

NestJS app with GraphQL and Prisma

## Usage
1. git clone
2. cd query_profiles
3. create .env file and set constants
4. docker compose up --build
5. open :3000/graphql and make a query

## ENV setup
See .env.example for details.

AUTH_USERNAME and AUTH_PASSWORD constants used for Basic HTTP auth

LOCAL_SSL_KEY_PATH and LOCAL_SSL_CERT_PATH for path to SSL keys on your host system

You can replace it to other paths, for example Lets Encrypt:

LOCAL_SSL_KEY_PATH=/etc/letsencrypt/live/YOUR_DOMAIN_NAME/privkey.pem

LOCAL_SSL_CERT_PATH=/etc/letsencrypt/live/YOUR_DOMAIN_NAME/fullchain.pem

Or just make self-signed one:

```bash
mkdir keys

cd keys

openssl genrsa -out key.pem

openssl req -new -key key.pem -out csr.pem

openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
```
