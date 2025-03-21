import { fetchUserDetail, fetchUserPlaylist } from "@/Redux";
import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { AspectRatio } from "./ui/aspect-ratio";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";
import NotFound from "@/Error/NotFound";
import PlaylistCard from "./PlaylistCard";
import { Plus } from "lucide-react";
import EmptyContent from "@/Error/EmptyContent";

function Playlist() {
  const dispatch = useDispatch();
  const { playlistData, playlistIsLoading, playlistError } = useSelector(
    (state) => state.playlist
  );
  const { userDetail, isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (userDetail?._id) {
      dispatch(fetchUserPlaylist(userDetail._id));
    }
  }, [dispatch, userDetail]);

  return playlistError ? (
    <NotFound />
  ) : (
    <div>
      <div className="h-auto w-full border-b-2 border-gray-500 pb-3 mb-3 flex flex-row items-center">
        <h1 className="xl:sm:text-4xl font-bold">Playlists</h1>
        <Plus className="h-10 w-10" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {playlistIsLoading || isLoading ? (
          Array(6)
            .fill()
            .map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg overflow-hidden shadow"
              >
                <Skeleton height={200} width={300} />
                <div className="p-3">
                  <Skeleton count={3} width={300} />
                </div>
              </div>
            ))
        ) : Array.isArray(playlistData?.data) && playlistData.data.length > 0 ? (
          playlistData.data.map((playlist) => (
            <PlaylistCard key={playlist._id} data={playlist} />
          ))
        ) : (
          <div className="col-span-3 flex justify-center items-center">
            <EmptyContent />
          </div>
        )}
      </div>
    </div>
  );
}

export default Playlist;
