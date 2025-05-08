import React, { useEffect } from "react";
import VideoCard from "./VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllChannelVideos, fetchChannelDetail } from "@/Redux";
import Skeleton from "react-loading-skeleton";
import EmptyContent from "@/Error/EmptyContent";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch();
  const {
    channelData, channelIsLoading, channelError
  } = useSelector((state) => state.channel);

  const {
    dashboardData,
    isLoading: dashboardLoading,
    error: dashboardError,
  } = useSelector((state) => state.dashboard);

  const {userDetail, isLoading} = useSelector(state => state.user)

  useEffect(() => {
    dispatch(fetchChannelDetail(userDetail?.username));
    dispatch(fetchAllChannelVideos());
  }, [dispatch]);

  return (
    <div className="max-w-7xl bg-white shadow-lg  overflow-hidden w-full">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 w-full">
        <img
          src={channelData?.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="h-10 w-60 absolute top-0 right-0  rounded-bl-lg bg-white">
        </div>
        {/* Avatar */}
        <div className="absolute bottom-[-50px] left-5 md:left-10">
          <img
            src={channelData?.avatar}
            alt="Avatar"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Profile Section - converting from grid to flex */}
      <div className="flex flex-col md:flex-row p-8 pt-14 gap-6">
        {/* User Info */}
        <div className="md:w-1/3 flex flex-col items-center">
          <h2 className="text-xl md:text-2xl font-semibold">{channelData?.fullName}</h2>
          <p className="text-gray-600 text-center">
            <span>@</span>
            {channelData?.username}
          </p>
        </div>

        {/* Stats */}
        <div className="md:w-2/3 flex justify-around items-center">
          <div className="text-center">
            <h4 className="text-lg font-bold">{channelData?.subscribersCount}</h4>
            <p className="text-gray-500 text-sm">Subscribers</p>
          </div>
          <div className="text-center">
            <h4 className="text-lg font-bold">{channelData?.subscribedToCount}</h4>
            <p className="text-gray-500 text-sm">Subscribed</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 border-t">
        <h3 className="text-lg font-semibold mb-4">Uploaded Videos</h3>
        <div className="flex flex-wrap  gap-4">
          {dashboardLoading
            ? Array(6)
                .fill()
                .map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg overflow-hidden shadow w-full max-w-sm mb-4 p-3"
                  >
                    <Skeleton height={200} width="100%" />
                    <div className="mt-3">
                      <Skeleton width="100%" />
                      <div className="flex items-center gap-2 my-2">
                        <Skeleton width={30} height={30} circle />
                        <Skeleton width="calc(100% - 40px)" />
                      </div>
                      <Skeleton width="100%" />
                    </div>
                  </div>
                ))
            : Array.isArray(dashboardData) && dashboardData.length > 0 ? (
              dashboardData.map((video) =>
                video ? (
                  <div key={video?._id} className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] xl:w-[calc(33.333%-11px)]">
                    <VideoCard video={video} />
                  </div>
                ) : null
              )
            ) : (
              <div className="w-full flex justify-center items-center">
                <EmptyContent />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
