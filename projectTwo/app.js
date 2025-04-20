import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

const MyClass = () => {
  const [songs, setSongs] = useState([
    { id: 1, songName: 'On My Way', artist: 'Alan Walker', poster: 'img/1.jpg' },
    { id: 2, songName: 'Alan Walker-Fade', artist: 'Alan Walker', poster: 'img/2.jpg' },
    { id: 3, songName: 'Cartoon - On & On', artist: 'Daniel Levi', poster: 'img/3.jpg' },
    // Add more songs as needed
  ]);

  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio('vande.mp3'));
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateTime);
    return () => audio.removeEventListener('timeupdate', updateTime);
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSongChange = (song) => {
    setCurrentSong(song);
    audioRef.current.src = `audio/${song.id}.mp3`;
    audioRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div>
      <header>
        <div className="menu_side">
          <h1>Spotify</h1>
          <div className="playlist">
            <h4 className="active">
              <span />
              <i className="bi bi-music-note-beamed" /> Playlist
            </h4>
            <h4>
              <span />
              <i className="bi bi-music-note-beamed" /> Last Listening
            </h4>
            <h4>
              <span />
              <i className="bi bi-music-note-beamed" /> Recommended
            </h4>
          </div>
          <div className="menu_song">
            {songs.map((song) => (
              <div key={song.id} className="songItem" onClick={() => handleSongChange(song)}>
                <span>{song.id}</span>
                <img src={song.poster} alt={song.songName} />
                <h5>
                  {song.songName}
                  <div className="subtitle">{song.artist}</div>
                </h5>
                <i className="bi playListPlay bi-play-circle-fill" />
              </div>
            ))}
          </div>
        </div>
        <div className="song_side">
          <nav>
            <ul>
              <li>Discover <span /></li>
              <li>MY LIBRARY</li>
              <li>RADIO</li>
            </ul>
            <div className="search">
              <i className="bi bi-search" />
              <input type="text" placeholder="Search Music..." />
            </div>
            <div className="user">
              <img src="logo.png" alt="User" title="Spotify (Chirag Nagar)" />
            </div>
          </nav>
          <div className="content">
            <h1>{currentSong.songName}</h1>
            <p>
              So when your tears roll down your pillow like a river
              <br />
              I'll be there for you
            </p>
            <div className="buttons">
              <button>PLAY</button>
              <button>FOLLOW</button>
            </div>
          </div>
          <div className="popular_song">
            <div className="h4">
              <h4>Popular Song</h4>
              <div className="btn_s">
                <i id="left_scroll" className="bi bi-arrow-left-short" />
                <i id="right_scroll" className="bi bi-arrow-right-short" />
              </div>
            </div>
            <div className="pop_song">
              {songs.map((song) => (
                <div key={song.id} className="songItem">
                  <div className="img_play">
                    <img src={song.poster} alt={song.songName} />
                    <i className="bi playListPlay bi-play-circle-fill" />
                  </div>
                  <h5>
                    {song.songName}
                    <br />
                    <div className="subtitle">{song.artist}</div>
                  </h5>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="master_play">
          <div className="wave">
            <div className="wave1" />
            <div className="wave1" />
            <div className="wave1" />
          </div>
          <img src={currentSong.poster} alt={currentSong.songName} id="poster_master_play" />
          <h5 id="title">
            {currentSong.songName}
            <div className="subtitle">{currentSong.artist}</div>
          </h5>
          <div className="icon">
            <i className="bi bi-skip-start-fill" id="back" />
            <i
              className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'}`}
              id="masterPlay"
              onClick={handlePlayPause}
            />
            <i className="bi bi-skip-end-fill" id="next" />
          </div>
          <span id="currentStart">{formatTime(currentTime)}</span>
          <div className="bar">
            <input
              type="range"
              id="seek"
              min={0}
              max={duration}
              value={currentTime}
              onChange={(e) => {
                audioRef.current.currentTime = e.target.value;
                setCurrentTime(e.target.value);
              }}
            />
            <div className="bar2" id="bar2" style={{ width: `${(currentTime / duration) * 100}%` }} />
            <div className="dot" style={{ left: `${(currentTime / duration) * 100}%` }} />
          </div>
          <span id="currentEnd">{formatTime(duration)}</span>
        </div>
      </header>
    </div>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

ReactDOM.render(<MyClass />, document.getElementById('root'));