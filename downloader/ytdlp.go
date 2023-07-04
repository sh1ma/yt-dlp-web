package ytdlpweb

import (
	"io"
	"os/exec"
)

type Downloader struct {
}

func (d Downloader) Download(url string) (io.ReadCloser, error) {
	cmd := exec.Command("yt-dlp", "-o", "-", url)
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		return nil, err
	}
	err = cmd.Start()
	return stdout, err
}

func NewDownloader() Downloader {
	return Downloader{}
}
