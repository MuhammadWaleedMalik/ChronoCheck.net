import React, { forwardRef } from 'react';

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  fallback?: React.ReactNode;
}

const LazyVideo = forwardRef<HTMLVideoElement, LazyVideoProps>(
  ({ src, fallback, ...props }, ref) => {
    return (
      <video
        ref={ref}
        src={src}
        playsInline
        disablePictureInPicture
        preload="none"
        {...props}
      >
        {fallback && (
          <div className="video-fallback">
            {fallback}
          </div>
        )}
        Your browser does not support the video tag.
      </video>
    );
  }
);

LazyVideo.displayName = 'LazyVideo';

export default LazyVideo;