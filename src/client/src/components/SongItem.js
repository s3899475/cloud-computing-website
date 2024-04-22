import React from 'react'

export default function SongItem({ song, onButton, buttonTitle }) {
  return (
    <div className='cell'>
      <img src={song.img_url} alt='song'></img>
      <div>
        <span>Title: {song.title}</span>
        <span>Artist: {song.artist}</span>
        <span>Year: {song.year}</span>
        <button className='button' onClick={() => onButton(song)}>{buttonTitle}</button>
      </div>
    </div>
  );
}