// components/VideoPlayer.js

const VideoPlayer = ({ videoId }) => {
    const videoUrl = `https://stream.new/v/${videoId}/embed`;
  
    return (
      <div className="video-container">
        <iframe
          src={videoUrl}
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
        <style jsx>{`
        .video-container {
          position: relative;
          width: 100%; // No desktop
          padding-top: 40.25%; // Proporção 16:9 para desktop
        }

        .video-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        // Media query para telas menores (mobile)
        @media (max-width: 600px) {
          .video-container {
            width: 100vw; // Utilize toda a largura da viewport no mobile
            padding-top: 0; // Removemos o padding-top para ajustar com base na altura
            // Calculamos a altura a partir da largura da viewport para a proporção 9:16
            height: calc(60vw * 16 / 9);
          }

          .video-container iframe {
            width: 100%; // O iframe usa 100% da largura do container
            height: 100%; // O iframe usa 100% da altura do container
          }
        }
      `}</style>
      </div>
    );
  };
  
  export default VideoPlayer;