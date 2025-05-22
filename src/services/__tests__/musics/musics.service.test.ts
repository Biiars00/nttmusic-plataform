import "reflect-metadata";
import MusicsService from "../../../services/musics/musics.service";
import IMusicsService, { IAlbumData } from "../../../interfaces/services/musics/musics.interface";
import IDeezerMusicGateway from "../../../interfaces/gateways/deezerMusic.interface";

const mockGateway: jest.Mocked<IDeezerMusicGateway> = {
  getAlbums: jest.fn(),
  getTracklistByAlbum: jest.fn(),
};

const albumData = {
    id: 1,
    title: "title",
    image: undefined,
    tracklist: "track-album",
    artist: {
        id: 1,
        name: "artist"
    }
};

const trackData = {
    id: 1,
    title:"title",
    duration: 12,
    preview: ".mp3",
    artist: {
        id: 1,
        name: "name"
    }
}

describe("MusicsService", () => {
  let service: MusicsService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new MusicsService(mockGateway);
  });

  describe("getAlbums", () => {
    it("Must list all albums", async () => {
      mockGateway.getAlbums.mockResolvedValue({
        albums: {
          data: [albumData],
        },
      });

      const result = await service.getAlbums();

      expect(result).toEqual([albumData]);
      expect(mockGateway.getAlbums).toHaveBeenCalled();
    });

    it("Should throw error if album list is not returned", async () => {
      mockGateway.getAlbums.mockResolvedValue(null as any);

      await expect(service.getAlbums()).rejects.toThrow("Resource not found!");
    });
  });

  describe("getTracklistByAlbum", () => {
    it("Should return a list of tracks", async () => {
      mockGateway.getTracklistByAlbum.mockResolvedValue({
        data: [trackData],
      });

      const result = await service.getTracklistByAlbum(1);

      expect(result).toEqual([trackData]);
      expect(mockGateway.getTracklistByAlbum).toHaveBeenCalledWith(1);
    });

    it("Should throw error if tracks list is not returned", async () => {
      mockGateway.getTracklistByAlbum.mockResolvedValue(null as any);

      await expect(service.getTracklistByAlbum(1)).rejects.toThrow("Resource not found!");
    });
  });
});