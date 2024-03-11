FROM golang:1.21-alpine AS build

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY . .

RUN go build -o app .

FROM golang:1.21-alpine

WORKDIR /app

COPY --from=build /app/app .

EXPOSE 8000

CMD ["./app"]
