"use client";
import { getSessionToken } from "@/app/actions/cookie-actions";
import BlurLoader from "@/components/BlurLoader";
import ResponsiveDrawer from "@/components/Modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type MediaItem = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  permalink: string;
  thumbnail_url?: string;
};

interface InstagramModelBodyProps {
  handleSend: (payload: { mediaId: string; targetText: string; replyText: string, media_url: string, media_type: string }) => void;
}

export default function InstagramModelBody({ handleSend }: InstagramModelBodyProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [targetText, setTargetText] = useState("");
  const [replyText, setReplyText] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const token = await getSessionToken();
        if (!token?.token) return router.replace("/login");

        setLoading(true);
        const res = await fetch("/api/instagram/feed", {
          headers: { Authorization: `Bearer ${token.token}` },
        });
        const data = await res.json();
        if (data?.success && data?.data) setMedia(data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Instagram media:", err);
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  if (loading) {
    return <BlurLoader isLoading={true} color="white" name="HashLoader" />;
  }

  const handleSave = () => {
    if (!selectedMedia) return;
    console.log("Saved", {
      mediaId: selectedMedia.id,
      targetText,
      replyText,
      media_url: selectedMedia?.media_url
    });
    handleSend({
      mediaId: selectedMedia.id,
      targetText,
      replyText,
      media_url: selectedMedia?.media_url,
      media_type: selectedMedia?.media_type,
    }); 
   
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2">
        {media.map((item) => (
          <div
            key={item.id}
            className="relative w-full pb-full overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition cursor-pointer"
          >
            <div
              className="absolute inset-0 z-10 cursor-pointer"
              onClick={() => setSelectedMedia(item)}
            ></div>
            {item.media_type === "VIDEO" ? (
              <video
                src={item.media_url}
                controls
                className="top-0 left-0 w-full h-full object-cover"
              />
            ) : (
              <img
                src={item.media_url}
                alt={item.caption || "Instagram post"}
                className="top-0 left-0 w-full h-full object-cover "
              />
            )}
            {item.caption && (
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-40 text-white text-xs p-1 line-clamp-2">
                {item.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      <ResponsiveDrawer
        isOpen={!!selectedMedia}
        onClose={() => setSelectedMedia(null)}
      >
        {selectedMedia && (
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-square overflow-hidden rounded-lg">
              {selectedMedia.media_type === "VIDEO" ? (
                <video
                  src={selectedMedia.media_url}
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={selectedMedia.media_url}
                  alt={selectedMedia.caption || "Instagram post"}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Target Text</label>
              <input
                type="text"
                value={targetText}
                onChange={(e) => setTargetText(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Reply Text</label>
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              onClick={handleSave}
              className="bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 transition"
            >
              Save
            </button>
          </div>
        )}
      </ResponsiveDrawer>
    </>
  );
}
