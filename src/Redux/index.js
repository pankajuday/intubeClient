import likeReducer, { likeToggleSlice, likedVideoSlice } from "./Slices/Like";
import videoReducer, { fetchAllVideos, fetchVideoById } from "./Slices/Video";
import authReducer, { fetchLogin, fetchLogout } from "./Slices/Auth";
import commentReducer, { fetchCommentsOnVideo } from "./Slices/Comment";
import historyReducer, { fetchHistoryDetail } from "./Slices/History";
import userReducer, { fetchUserDetail } from "./Slices/User";
import dashboardReducer, { fetchAllChannelVideos } from "./Slices/Dashboard";
import playlistReducer, {
  fetchUserPlaylist,
  fetchCreatePlaylist,
  fetchAddVideoOnPlaylist,
  fetchRemoveVideoFromPlaylist,
  fetchDeletePlaylistById,
  fetchGetPlaylistById,
  fetchUpdatePlaylistById,
} from "./Slices/Playlist";

export {
  likeToggleSlice,
  likedVideoSlice,
  fetchAllVideos,
  fetchVideoById,
  fetchLogin,
  fetchLogout,
  likeReducer,
  videoReducer,
  authReducer,
  fetchCommentsOnVideo,
  commentReducer,
  historyReducer,
  fetchHistoryDetail,
  userReducer,
  fetchUserDetail,
  dashboardReducer,
  fetchAllChannelVideos,
  playlistReducer,
  fetchUserPlaylist,
  fetchCreatePlaylist,
  fetchAddVideoOnPlaylist,
  fetchRemoveVideoFromPlaylist,
  fetchDeletePlaylistById,
  fetchGetPlaylistById,
  fetchUpdatePlaylistById,
};
