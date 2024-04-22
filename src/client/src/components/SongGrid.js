
export default function SongGrid({ songs, buttonTitle, onButton }) {
  return (
    <div className='grid'>
      {songs.map((song) =>
        <div className='cell'>
          <div className='card'>
            <div className='card-image'>
              <figure className='image'>
                <img src={song.img_url} alt='song'></img>
              </figure>
            </div>
            <div className='card-content'>
              <div className='content'>
                Title: {song.title}<br/>
                Artist: {song.artist}<br/>
                Year: {song.year}
              </div>
            </div>
            <div className='card-footer'>
              <button className='button' onClick={() => onButton(song)}>{buttonTitle}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}