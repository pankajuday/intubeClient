import { fetchVideosBySearch } from "@/Redux/Slices/Video";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import VideoCard from "./VideoCard";
import SpringLoader from "./SpringLoader";
import EmptyContent from "@/Error/EmptyContent";
import { ArrowDown, ArrowUp, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";

function SearchVideo() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { videoLoading, videoError, searchResult } = useSelector(
    (state) => state.video
  );
  
  // Get query from URL search params
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";
  
  // State for filters and sorting
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortType, setSortType] = useState("desc");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  
  // Fetch videos when query, page or sorting changes
  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchVideosBySearch({ 
        query: searchQuery,
        page,
        sortBy,
        sortType
      }));
    }
  }, [dispatch, searchQuery, page, sortBy, sortType]);
  
  // Handle filter toggle
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  // Handle sort change
  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      // Toggle sort direction if clicking the same sort option
      setSortType(sortType === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortType("desc"); // Default to descending for new sort option
    }
  };
  
  return (
    <div className="search-page  px-4 md:px-8 max-w-screen-2xl mx-auto">
      {/* Search header */}
      <div className="search-header mb-6">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl font-bold">
            {searchQuery ? `Search Results for: "${searchQuery}"` : "Search Videos"}
          </h1>
        </div>
        
        {/* Filters section */}
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {searchResult.docs?.length > 0 ? `${searchResult.docs?.length} results found` : ""}
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleFilters}
            className="flex items-center gap-2"
          >
            <SlidersHorizontal size={16} />
            Filter & Sort
          </Button>
        </div>
        
        {/* Expanded filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={sortBy === "createdAt" ? "default" : "outline"} 
                size="sm"
                onClick={() => handleSortChange("createdAt")}
              >
                Date {sortBy === "createdAt" && (sortType === "asc" ? <ArrowUp/> : <ArrowDown/>)}
              </Button>
              <Button 
                variant={sortBy === "views" ? "default" : "outline"} 
                size="sm"
                onClick={() => handleSortChange("views")}
              >
                Views {sortBy === "views" && (sortType === "asc" ? <ArrowUp/> : <ArrowDown/>)}
              </Button>
              <Button 
                variant={sortBy === "title" ? "default" : "outline"} 
                size="sm"
                onClick={() => handleSortChange("title")}
              >
                Title {sortBy === "title" && (sortType === "asc" ? <ArrowUp/> : <ArrowDown/>)}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Loading state */}
      {videoLoading && <SpringLoader />}

      
      
      {/* Error state */}
      {videoError && (
        <div className="error-container p-4 bg-red-50 text-red-600 rounded-lg">
          <p className="font-medium">Error loading videos</p>
          <p>{videoError}</p>
        </div>
      )}
      
      {/* Empty state */}
      {!videoLoading && !videoError && searchQuery && searchResult.docs?.length === 0 && (
        <div className="empty-state text-center py-10">
          <EmptyContent />
          <h2 className="mt-4 text-xl font-semibold">No videos found for "{searchQuery}"</h2>
          <p className="mt-2 text-gray-600">Try different keywords or check your spelling</p>
        </div>
      )}
      
      {/* Search results */}
      {!videoLoading && !videoError && searchResult.docs?.length > 0 && (
        <div className="videos-container flex flex-wrap gap-4 justify-start">
          {searchResult.docs?.map((video) => (
            <div className=" video-container w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] xl:w-[calc(33.333%-11px)]">
              <VideoCard key={video._id} video={video} />
            </div>
          ))}
        </div>
      )}
      
      {/* Pagination - Only show if we have results */}
      
        <div className="pagination flex justify-center mt-8 gap-2">
          <Button 
            variant="outline" 
            size="sm"
            disabled={searchResult?.hasPrevPage === false}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={searchResult.hasNextPage === false}
          >
            Next
          </Button>
        </div>
    </div>
  );
}

export default SearchVideo;
