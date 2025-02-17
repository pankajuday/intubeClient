import React, { useEffect, useState } from 'react';
import VideoCard from './VideoCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { history } from '../axios';

const History = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideosFn = async () => {
      try {
        const response = await history();
        console.log('Response data:', response.data); // Log the response data to check its structure

        // Access the data array from the response
        if (response.data ) {
          setVideos(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setLoading(false);
      }
    };

    fetchVideosFn();
  }, []);

  return (
    <div className="video-container relative">
      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
        {loading ? (
          Array(8).fill().map((_, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow">
              <Skeleton height={200} width={300} />
              <div className="p-3">
                <Skeleton count={3} width={300} />
              </div>
            </div>
          ))
        ) : (
          Array.isArray(videos) && videos.map(video => (
            <VideoCard key={video._id} video={video} />
          ))
        )}
      </div>
    </div>
  );
};

export default History;