const Home = () => {
  const videoId = 'w40i3B1IlmQ'; // ID do vídeo do YouTube (por exemplo, após o v= na URL)

  return (
    <div className="video-container">
      <iframe  width="560" height="315" src="https://www.youtube-nocookie.com/embed/w40i3B1IlmQ?si=sHFi-_pqVjsp2xRX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <style jsx>{`
        .video-container {
          position: relative;
          width: 50vh; // No desktop
          padding-top: 42.4%; // Proporção 16:9 para desktop
          margin: auto;
        }

        .video-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          margin: auto;
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

export default Home;
