import likeReducer ,{ likesToggleSlice, likesVideoSlice } from "./slices/video/likeSlice";
import videoReducer,{ fetchAllVideos, fetchVideoByIdSlice } from "./slices/video/videoSlice";
import authReducer,{ fetchLogin, fetchLogout } from "./slices/Auth/auth";


export {
    likesToggleSlice,
    likesVideoSlice,
    fetchAllVideos, fetchVideoByIdSlice ,
    fetchLogin, fetchLogout ,
    likeReducer,videoReducer,authReducer

}