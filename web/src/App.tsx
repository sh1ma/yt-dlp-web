import { useState } from 'react'

const isValidUrl = (url: string) => {
  try {
    // URLかどうかのチェック
    const parsed = new URL(url)
    // YoutubeのURLかどうかのチェック
    if (parsed.hostname !== 'www.youtube.com') {
      return false
    }

    return true
  } catch (e) {
    return false
  }
}

function App() {
  const [url, setUrl] = useState('')
  const [isUrlValid, setIsUrlValid] = useState(true)

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setUrl(url)
    setIsUrlValid(isValidUrl(url))
  }

  const handleDownloadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const params = { url: url }
    const query = new URLSearchParams(params)

    window.open('/api/download?' + query.toString(), '_blank')?.focus()
  }

  return (
    <div className='text-black'>
      <header
        className='
    flex flex-row 
    justify-start items-center
    p-4
    shadow-md
    '
      >
        <a href='/'>
          <h1 className='text-xl'>yt-dlp-web</h1>
        </a>
      </header>

      <main className='p-8'>
        <label className='block' htmlFor='url_input'>
          Youtube URL
        </label>
        <input
          id='url_input'
          type='text'
          onChange={(e) => handleUrlChange(e)}
          placeholder='https://www.youtube.com/watch?v=2b1IexhKPz4'
          className={`p-2 rounded-sm w-full border-b-2 border-gray-300 ${
            url !== ''
              ? isUrlValid
                ? 'border-green-500'
                : 'border-red-500'
              : null
          }`}
        />
        <button
          onClick={(e) => handleDownloadClick(e)}
          className={`mt-4 p-3 rounded-lg text-white ${
            isUrlValid ? 'bg-blue-500' : 'cursor-not-allowed bg-gray-400'
          }`}
          disabled={!isUrlValid}
        >
          <span>Download</span>
        </button>
      </main>
    </div>
  )
}

export default App
