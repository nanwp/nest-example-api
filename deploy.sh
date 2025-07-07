git pull

# Install dependencies
docker compose build --no-cache
docker compose down
docker compose up -d

# Run migrations
docker compose exec nest-app npm run prisma:migrate