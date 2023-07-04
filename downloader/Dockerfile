FROM golang:1.20

WORKDIR /app

RUN apt-get update && apt-get install -y \
    yt-dlp \
    && rm -rf /var/lib/apt/lists/*


COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY . ./

RUN go build -o main cmd/main.go

CMD [ "./main"]
