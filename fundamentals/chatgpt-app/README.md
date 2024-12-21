mkdir -p 'src/app/api/auth/[...nextauth]' && touch 'src/app/api/auth/[...nextauth]/route.ts'

docker exec -i chatgpt-app-postgres-1 psql -U postgres -d postgres < lib/shcema.psql
