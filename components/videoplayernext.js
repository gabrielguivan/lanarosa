// components/VideoPlayer.js

import ReactPlayer from 'react-player';

const VideoPlayer = ({ url }) => {
  return (
    <div className='player-wrapper'>
      <ReactPlayer
        url={url}
        className='react-player'
        playing
        width='100%'
        height='100%'
        controls={true}
      />
      <style jsx>{`
        .player-wrapper {
          position: relative;
          padding-top: 56.25%; /* Aspect ratio 16:9 */
          height: 0;
        }

        .react-player {
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>
    </div>
  );
};

export default VideoPlayer;