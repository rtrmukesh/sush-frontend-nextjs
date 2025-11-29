"use client";

type MediaItem = {
  createdAt: string;
  id: string;
  integrationId: string;
  mediaId: string;
  media_url: string;
  media_type: "IMAGE" | "VIDEO"; // <-- Add this
  replyText: string;
  targetText: string;
  updatedAt: string;
};

export default function InstagramAutoReplyList({ mediaList }: { mediaList: MediaItem[] }) {
  return (
    <div className="space-y-4 mt-5">
      {mediaList?.length > 0 ? (
        mediaList.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-4 border rounded-lg shadow p-3 bg-white"
          >
            {/* Media Preview */}
            {item.media_type === "VIDEO" ? (
              <video
                src={item.media_url}
                className="w-32 h-32 object-cover rounded-md"
              />
            ) : (
              <img
                src={item.media_url}
                alt={item.mediaId}
                className="w-32 h-32 object-cover rounded-md"
              />
            )}

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm text-gray-600"><strong>Trigger:</strong> {item.targetText}</p>
              <p className="text-sm text-gray-600 mt-1"><strong>Reply:</strong> {item.replyText}</p>
              <p className="text-xs text-gray-500 mt-2">
                Created: {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No Auto Replies Found</p>
      )}
    </div>
  );
}
