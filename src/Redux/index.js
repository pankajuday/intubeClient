import likeReducer, { likeToggleSlice, likedVideoSlice } from "./Slices/Like";
import videoReducer, { fetchAllVideos, fetchVideoById, fetchDeleteVideoById,fetchPostVideo, fetchUpdateVideoById } from "./Slices/Video";
import authReducer, { fetchLogin, fetchLogout, fetchSignUp, resetAuthState } from "./Slices/Auth";
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
import subscriptionReducer, { fetchSubscribedChannels, fetchChannelSubscribers, fetchToggleSubscription } from "./Slices/Subscription";
import channelReducer , { fetchChannelDetail } from "./Slices/Channel";

export {
  likeToggleSlice,
  likedVideoSlice,
  fetchAllVideos,
  fetchVideoById,
  fetchDeleteVideoById,fetchPostVideo, fetchUpdateVideoById,
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
  subscriptionReducer, fetchChannelSubscribers, fetchSubscribedChannels, fetchToggleSubscription,
  channelReducer, fetchChannelDetail,fetchSignUp, resetAuthState
};
