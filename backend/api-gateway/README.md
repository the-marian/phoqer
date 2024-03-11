# api-gateway

# To run localy

1. run MongoDB localy
```
docker run -d  --name mongo  -p 27888:27017 -e MONGO_INITDB_ROOT_USERNAME=phoqer -e MONGO_INITDB_ROOT_PASSWORD=change-me mongo
```
if you use mongo compass auth url will be following
```
mongodb://phoqer:change-me@localhost:27888/?authMechanism=DEFAULT
```
2. install dependencies
```
go mod tidy
```
3. run categories service 
```
go run main.go
```

