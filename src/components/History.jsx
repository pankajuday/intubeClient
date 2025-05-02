import React, { useEffect, useState } from 'react';
import VideoCard from './VideoCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { history } from '../axios';

const History = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     let isMounted = true;
     const fetchHistory = async () => {
       try {
         const response = await history();
         
         if (isMounted) {
           setVideos(response.data);
           setLoading(false);
         } else {
           console.error('Unexpected response format:', response.data);
           setLoading(false);
         }
         
       } catch (error) {
         if (isMounted) {
           console.error('Error fetching videos:', error);
           setLoading(false);
         }
       }
     };
 
     fetchHistory();
     return () => {
       isMounted = false;
     };
   }, []);

  return (
    <div className="video-container relative w-full">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold h-auto w-full border-b-2 border-gray-500 pb-3 mb-6">Watch History</h1>
      
      {/* Video List  */}
      <div className="flex flex-wrap flex-row  gap-4">
        {loading ? (
          Array(6).fill().map((_, i) => (
            <div key={i} className="bg-white rounded-sm flex-wrap flex-row overflow-hidden shadow w-full max-w-sm mb-4 p-3">
              <Skeleton height={200} width="100%" />
              <div className="mt-3">
                <Skeleton width="100%" />
                <div className='flex items-center gap-2 my-2'>
                  <Skeleton width={30} height={30} circle />
                  <Skeleton width="calc(100% - 40px)" />
                </div>
                <Skeleton width="100%" />
              </div>
            </div>
          ))
        ) : (
          Array.isArray(videos) && videos.map(video => (
            <div key={video._id} className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] xl:w-[calc(33.333%-11px)]">
              <VideoCard video={video} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;