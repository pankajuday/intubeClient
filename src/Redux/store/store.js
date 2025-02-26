import { configureStore } from "@reduxjs/toolkit";
import { videoReducer,authReducer,likeReducer, commentReducer } from "..";

const store = configureStore({
    reducer:{
        video:videoReducer,
        auth:authReducer,
        like:likeReducer,
        comment: commentReducer

    }
    ,
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //   serializableCheck:false
    // }),
})


export default store;



// import { configureStore } from "@reduxjs/toolkit";
// import videoReducer from "../slices/video/videoSlice";
// import storage from "redux-persist/lib/storage"
// import { persistStore, persistReducer } from "redux-persist";

// const persistConfig = {
//     key: "root",
//     storage,
//   };
  
//   const persistedReducer = persistReducer(persistConfig, videoReducer);


// export const store = configureStore({
//     reducer: {
//         video: persistedReducer,
//     },
// });

// export const persistor =  persistStore(store);