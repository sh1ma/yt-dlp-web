package main

import (
	"net/http"
	"net/url"
	"ytdlpweb"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Ytdlp struct {
	*ytdlpweb.Downloader
}

func main() {
	d := Ytdlp{&ytdlpweb.Downloader{}}

	e := echo.New()
	e.Use(middleware.Recover())
	e.Use(middleware.Logger())
	e.Use(middleware.Gzip())

	api := e.Group("/api")

	api.GET("/download", d.handleDownload)

	e.Logger.Fatal(e.Start(":3001"))
}

func (y Ytdlp) handleDownload(ctx echo.Context) error {

	parsedUrl, err := url.ParseRequestURI(ctx.QueryParam("url"))
	if err != nil {
		return ctx.String(http.StatusBadRequest, "Invalid URL")
	}
	if parsedUrl.Hostname() != "www.youtube.com" {
		return ctx.String(http.StatusBadRequest, "Invalid URL")
	}

	reader, err := y.Download(ctx.QueryParam("url"))
	if err != nil {
		return err
	}
	res := ctx.Response()
	res.Header().Set("Cache-Control", "max-age=86400")
	res.Header().Set("Content-Disposition", "attachment; filename=video.mp4")

	return ctx.Stream(http.StatusOK, "application/octet-stream", reader)
}
