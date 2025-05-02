import { fetchUserDetail, fetchUserPlaylist } from "@/Redux";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { AspectRatio } from "./ui/aspect-ratio";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";
import NotFound from "@/Error/NotFound";
import PlaylistCard from "./PlaylistCard";
import { Plus } from "lucide-react";
import EmptyContent from "@/Error/EmptyContent";
import { Button } from "./ui/button";
import PlaylistCreate from "./PlaylistCreate";

function Playlist() {
  const dispatch = useDispatch();
  const { playlistData, playlistIsLoading, playlistError } = useSelector(
    (state) => state.playlist
  );
  const { userDetail, isLoading, error } = useSelector((state) => state.user);
  const [playlistPOPCreateActive, setPlaylistPOPCreateActive] = useState(false);

  useEffect(() => {
    if (userDetail?._id) {
      dispatch(fetchUserPlaylist(userDetail._id));
    }
  }, [dispatch, userDetail]);
  
  const handlePlaylistCreatePOP = () => {
    setPlaylistPOPCreateActive(!playlistPOPCreateActive);
  };

  return playlistError ? (
    <NotFound />
  ) : (
    <div className="w-full relative">
      <div className="h-auto w-full border-b-2 border-gray-500 pb-3 mb-6 flex flex-row items-center space-x-1">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Playlists
        </h1>
        <Button
          variant="ghost"
          className="justify-center items-center hover:cursor-pointer"
          onClick={handlePlaylistCreatePOP}
        >
          <Plus className="hover:text-gray-600 transition-colors " />
          
        </Button>
      </div>

      {/* Popup Overlay */}
      {playlistPOPCreateActive && (
        <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50">
          <div className="w-full max-w-md p-4">
            <PlaylistCreate onClose={handlePlaylistCreatePOP} />
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        {playlistIsLoading || isLoading ? (
          Array(6)
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
        ) : Array.isArray(playlistData) &&
          playlistData.length > 0 ? (
          playlistData?.map((playlist) => (
            <div
              key={playlist._id}
              className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] xl:w-[calc(33.333%-11px)]"
            >
              <PlaylistCard data={playlist} />
            </div>
          ))
        ) : (
          <div className="w-full flex justify-center items-center">
            <EmptyContent />
          </div>
        )}
      </div>
    </div>
  );
}

export default Playlist;
