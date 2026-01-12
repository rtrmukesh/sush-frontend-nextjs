
class MediaService {
  static async fetchPDFList() {
    const res = await fetch("/api/pdf/list");

    if (!res.ok) {
      throw new Error("Failed to fetch pdf");
    }

    return res.json();
  }
}
export default MediaService;