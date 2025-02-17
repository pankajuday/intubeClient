import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { fetchVideoById } from '../axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const VideoPlayerPage = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await fetchVideoById(videoId);
        setVideo(response.data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching video details:', error);
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, [videoId]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Video Player Section */}
      <div className="aspect-video bg-black rounded-xl overflow-hidden">
        {loading ? (
          <Skeleton height="100%" />
        ) : (
          <ReactPlayer
            url={video.videoFile}
            controls
            width="100%"
            height="100%"
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload',
                  type: 'video/3gpp'
                }
              }
            }}
          />
        )}
      </div>

      {/* Video Info Section */}
      <div className="mt-6 space-y-4">
        {loading ? (
          <>
            <Skeleton width={480} height={32} />
            <Skeleton width={360} height={24} />
            <Skeleton count={3} />
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900">{video.title}</h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <span>{video.views} views</span>
              <span>•</span>
              <span>{video.likes} likes</span>
              <span>•</span>
              <span>
                {new Date(video.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <p className="text-gray-800 leading-relaxed">{video.description}</p>
          </>
        )}
      </div>

      {/* Comments Section (Optional) */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        {/* Add comments implementation here */}
      </div>
    </div>
  );
};

export default VideoPlayerPage;