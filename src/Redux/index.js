import likeReducer ,{ likeToggleSlice, likedVideoSlice } from "./slices/video/likeSlice";
import videoReducer,{ fetchAllVideos, fetchVideoByIdSlice } from "./slices/video/videoSlice";
import authReducer,{ fetchLogin, fetchLogout } from "./slices/Auth/auth";
import commentReducer, { fetchCommentsOnVideo } from "./slices/video/commentSlice";
import historyReducer, { fetchHistoryDetail } from "./slices/history/history";
import userReducer,{ fetchUserDetail } from "./slices/user/user";
import dashboardReducer,{ fetchAllChannelVideos, } from "./slices/Dashboard/dashboard";



export {
    likeToggleSlice,
    likedVideoSlice,
    fetchAllVideos, fetchVideoByIdSlice ,
    fetchLogin, fetchLogout ,
    likeReducer,videoReducer,authReducer,
    fetchCommentsOnVideo,
    commentReducer,
    historyReducer,fetchHistoryDetail,
    userReducer, fetchUserDetail,
    dashboardReducer, fetchAllChannelVideos
    

}