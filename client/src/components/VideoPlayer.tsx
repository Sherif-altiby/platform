import YouTube, { YouTubeProps } from 'react-youtube';

interface CustomYouTubePlayerProps {
  videoId: string;
}

const VideoPlayer: React.FC<CustomYouTubePlayerProps> = ({ videoId }) => {
  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,  
      controls: 0, 
      modestbranding: 1, 
      showinfo: 0,  
      rel: 0,  
      iv_load_policy: 3,  
    },
  };

  return (
    <div style={{ position: 'relative', paddingBottom: '56.25%', overflow: 'hidden' }}>
      <YouTube
        videoId={videoId}
        opts={opts}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default VideoPlayer;