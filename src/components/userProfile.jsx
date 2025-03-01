import React, { useEffect } from "react";
import VideoCard from "./VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllChannelVideos, fetchUserDetail } from "@/Redux";
import Skeleton from "react-loading-skeleton";

const UserProfile = () => {
  const dispatch = useDispatch();
  const {
    userDetail,
    isLoading: userLoading,
    error: userError,
  } = useSelector((state) => state.user);
  const {
    dashboardData,
    isLoading: dashboardLoading,
    error: dashboardError,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchUserDetail());
    dispatch(fetchAllChannelVideos());
  }, [dispatch]);

  return (
    <div className="max-w-7xl grid mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Cover Image */}
      <div className="relative h-64 w-full">
        <img
          src={userDetail.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {/* Avatar */}
        <div className="absolute bottom-[-50px] left-10">
          <img
            src={userDetail.avatar}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      {/* Profile Section */}
      <div className="grid grid-cols-12 gap-6 p-8 pt-14">
        {/* User Info */}
        <div className="col-span-4 flex flex-col items-center">
          <h2 className="text-2xl font-semibold">{userDetail.fullName}</h2>
          <p className="text-gray-600 text-center">
            <span>@</span>
            {userDetail.username}
          </p>
        </div>

        {/* Stats */}
        <div className="col-span-8 flex justify-around items-center">
          <div className="text-center">
            <h4 className="text-lg font-bold">10k</h4>
            <p className="text-gray-500 text-sm">Subscribers</p>
          </div>
          <div className="text-center">
            <h4 className="text-lg font-bold">10k</h4>
            <p className="text-gray-500 text-sm">Subscribed</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 border-t">
        <h3 className="text-lg font-semibold mb-4">Uploaded Videos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
          {dashboardLoading
            ? Array(6)
                .fill()
                .map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg overflow-hidden shadow flex flex-col items-center"
                  >
                    <Skeleton height={200} width={300} />
                    <div className="p-3">
                      <Skeleton width={300} />
                      <div className="flex items-center justify-around">
                        <Skeleton width={30} height={30} circle />
                        <Skeleton width={250} />
                      </div>
                      <Skeleton width={300} />
                    </div>
                  </div>
                ))
            : Array.isArray(dashboardData) &&
              dashboardData.map((video) =>
                video ? <VideoCard key={video?._id} video={video} /> : null
              )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
