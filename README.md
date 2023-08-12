# Development
### Pre-process
- Install backend dependency
  ```
  pip install -r backend/requirements.dev.txt
  ```
- Install frontend dependency
  ```
  pnpm dev-install
  ```
- Generate local ```env```
    ```
    cp ./frontend/.env.local.defaults ./frontend/.env.local
    cp ./backend/.env.defaults ./backend/.env
    ```
- Modify ```./frontend/.env.local``` environment variables
- Modify in ```./backend/.env``` file 
  1. **SQL** related can refer to ```./docker-compose.yml```
  2. Fill in or modify other keys' value

### Run Database(If not Running)
```
pnpm db
```
### Run Backend Server
```
pnpm backend
```
### Run Frontend Application
```
pnpm dev
```

---

# Production

### Setup environment variables
- Generate local ```docker-compose.yml``` and ```env```
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
  - ```SQL_HOST="av-superb-mysql"```
- Modify ```./frontend/.env.local``` environment variables
- Make sure ```./frontend/.env.production``` contains correct domain name

### Run
```
docker network create av-superb
docker compose -f ./production/docker-compose.yml up -d
```