import { Loader } from "lucide-react";

const SpringLoader  = () => {
  return (
    <div className="flex items-center justify-center h-20">
      <Loader className="h-8 w-8 animate-spin text-green-400" />
    </div>
  );
};

export default SpringLoader;