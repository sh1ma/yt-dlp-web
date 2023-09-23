FROM golang:1.20

WORKDIR /app

RUN apt-get update && apt-get install -y \
    wget \
    && rm -rf /var/lib/apt/lists/*

RUN wget https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -O /usr/local/bin/yt-dlp \
    && chmod a+rx /usr/local/bin/yt-dlp

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY . ./

RUN go build -o main cmd/main.go

CMD [ "./main"]
