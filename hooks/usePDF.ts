import MediaService from "@/services/MediaService";
import { useQuery } from "@tanstack/react-query";

export const usePDF = () => {
  return useQuery({
    queryKey: ["pdf-media"],
    queryFn: MediaService.fetchPDFList,
  });
};
