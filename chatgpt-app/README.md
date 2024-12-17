mkdir -p 'src/app/api/auth/[...nextauth]' && touch 'src/app/api/auth/[...nextauth]/route.ts'

cd src/db
docker exec -i gptchat_container psql -U postgres -d gptchat_db < shcema.psql

docker exec -i chatgpt-app-postgres-1 psql -U postgres -d postgres < shcema.psql
