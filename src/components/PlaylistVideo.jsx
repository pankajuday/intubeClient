import React from "react";
import defImg from "../assets/playlist.png";
import { Card, CardContent } from "./ui/card";
import { Plus, Share2, Edit } from "lucide-react";
import VideoCard from "./VideoCard";

function PlaylistVideo() {
    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Side - Fixed Playlist Info */}
                <div className="w-full lg:w-1/2 lg:sticky lg:top-20 ">
                    <Card className="h-full">
                        <CardContent className="p-6 space-y-4">
                            {/* Default Image */}
                            <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                <img 
                                    src={defImg} 
                                    alt="Playlist cover" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            
                            {/* Title and Actions */}
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    Playlist Title
                                </h2>
                                <div className="flex gap-3">
                                    <button 
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                        title="Edit playlist"
                                    >
                                        <Edit size={20} className="text-gray-600" />
                                    </button>
                                    <button 
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                        title="Share playlist"
                                    >
                                        <Share2 size={20} className="text-gray-600" />
                                    </button>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600">
                                Add your playlist description here. This section will contain information about your playlist.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Side - Scrollable Video List */}
                <div className="w-full lg:w-1/2">
                    <div className="h-full">
                        <div className="p-6">
                            {/* Scrollable Video List */}
                            <div className="h-[calc(100vh-200px)] overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                {/* <VideoCard /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaylistVideo;