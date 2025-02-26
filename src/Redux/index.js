import likeReducer ,{ likeToggleSlice, likedVideoSlice } from "./slices/video/likeSlice";
import videoReducer,{ fetchAllVideos, fetchVideoByIdSlice } from "./slices/video/videoSlice";
import authReducer,{ fetchLogin, fetchLogout } from "./slices/Auth/auth";
import commentReducer, { fetchCommentsOnVideo } from "./slices/video/commentSlice";



export {
    likeToggleSlice,
    likedVideoSlice,
    fetchAllVideos, fetchVideoByIdSlice ,
    fetchLogin, fetchLogout ,
    likeReducer,videoReducer,authReducer,
    fetchCommentsOnVideo,
    commentReducer,
    

}