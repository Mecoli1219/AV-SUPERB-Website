# Production

## Setup environment variables
- Generate local docker-compose.yml
    ```
    cp ./production/docker-compose.defaults.yml ./production/docker-compose.yml
    cp ./frontend/.env.local.defaults ./frontend/.env.local
    cp ./backend/.env.defaults ./backend/.env
    ```
- Modify ```./production/docker-compose.yml``` environment variables with password generator, e.g. ```openssl rand -base64 32```:
    ```
    MYSQL_ROOT_PASSWORD: 
    MYSQL_DATABASE: 
    MYSQL_USER:
    MYSQL_PASSWORD:
    ```
- Modify ```./backend/.env``` regarding to the setting in previous step
- Modify ```./frontend/.env.local``` environment variables:

## Run
```
docker network create av-superb
docker compose -f ./production/docker-compose.yml up -d
```