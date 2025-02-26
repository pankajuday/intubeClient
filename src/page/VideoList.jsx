import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { fetchVideos } from '../axios';
import VideoCard from '@/components/VideoCard';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const fetchVideosFn = async () => {
      try {
        const response = await fetchVideos(page);
        const data = response.data;
        
        setVideos(data.docs);
        setTotalPages(data.totalPages);
        setHasPrevPage(data.hasPrevPage);
        setHasNextPage(data.hasNextPage);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setLoading(false);
      }
    };

    fetchVideosFn();
  }, [page]);

  return (
    <div className="video-container relative">
      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
        {loading ? (
          Array(6).fill().map((_, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow">
              <Skeleton height={200} width={300} />
              <div className="p-3">
                <Skeleton count={3} width={300} />
              </div>
            </div>
          ))
        ) : (
          videos.map(video => (
            <VideoCard key={video._id} video={video} />
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center items-center gap-4">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={!hasPrevPage}
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={!hasNextPage}
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VideoList;