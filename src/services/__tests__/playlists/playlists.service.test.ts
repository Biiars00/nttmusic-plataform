import "reflect-metadata";
import { ITrackData } from "../../../interfaces/services/musics/musics.interface";
import IPlaylistsRepository, { IPlaylistData } from "../../../interfaces/repositories/playlists/playlists.interface";
import PlaylistService from "../../../services/playlists/playlists.service";

const mock: jest.Mocked<IPlaylistsRepository> = {
  addPlaylistDB: jest.fn(),
  getPlaylistDB: jest.fn(),
  updateNamePlaylistDB: jest.fn(),
  removePlaylistDB: jest.fn(),
  addTrackToPlaylistDB: jest.fn(),
  removeTrackFromPlaylistDB: jest.fn(),
  listTracksFromPlaylistDB: jest.fn(),
};

const trackData: ITrackData = {
    id: 1,
    title: "title",
    duration: 12,
    preview: ".mp3",
    artist: {
        id: 1,
        name: "artist"
    }
};

describe.only("PlaylistService", () => {
  let service: PlaylistService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new PlaylistService(mock);
  });

  describe.only("addPlaylist", () => {
    it("Should add a playlist successfully", async () => {
        mock.addPlaylistDB.mockResolvedValue("Playlist added successfully!");

        const result = await service.addPlaylist("my-playlist");

        expect(result).toBe("Playlist added successfully!");
        expect(mock.addPlaylistDB).toHaveBeenCalledWith("my-playlist");
    });

    it("Should throw error if playlist is not added", async () => {
      mock.addPlaylistDB.mockResolvedValue(null as any);

      await expect(service.addPlaylist("my-playlist"))
        .rejects
        .toThrow("Playlist not added. Try again!");
    });
  });

  describe.only("getPlaylist", () => {
    it("Should return all playlists", async () => {
        const playlistData = [
            { 
                id: "1", 
                name: "P1" 
            }
        ] as IPlaylistData[];

        mock.getPlaylistDB.mockResolvedValue(playlistData);

        const result = await service.getPlaylist();

        expect(result).toEqual(playlistData);
    });
  });

  describe("updateNamePlaylist", () => {
    it("Must update playlist name", async () => {
      mock.updateNamePlaylistDB.mockResolvedValue("id");

      const result = await service.updateNamePlaylist("1", "new name");

      expect(result).toBe("id");
    });

    it("Should throw error if playlist is not updated", async () => {
      mock.updateNamePlaylistDB.mockResolvedValue(null as any);

      await expect(service.updateNamePlaylist("1", "new name"))
        .rejects
        .toThrow("Playlist name not update. Try again!");
    });
  });

  describe("removePlaylist", () => {
    it("Should remove the playlist successfully", async () => {
      mock.removePlaylistDB.mockResolvedValue("Playlist removed successfully!");

      const result = await service.removePlaylist("1");

      expect(result).toBe("Playlist removed successfully!");
    });

    it("Should throw error if playlist is not removed", async () => {
      mock.removePlaylistDB.mockResolvedValue(null as any);

      await expect(service.removePlaylist("1"))
        .rejects
        .toThrow("Playlist not removed. Try again!");
    });
  });

  describe("addTrackToPlaylist", () => {
    it("Must add a track to the playlist", async () => {
      mock.addTrackToPlaylistDB.mockResolvedValue("Track added successfully!");

      const result = await service.addTrackToPlaylist("1", trackData);

      expect(result).toBe("Track added successfully!");
    });

    it("Should throw error if track is not added", async () => {
      mock.addTrackToPlaylistDB.mockResolvedValue(null as any);

      await expect(service.addTrackToPlaylist("1", trackData))
        .rejects
        .toThrow("Track not added. Try again!");
    });
  });

  describe("removeTrackFromPlaylist", () => {
    it("Must remove a track from the playlist", async () => {
      mock.removeTrackFromPlaylistDB.mockResolvedValue("Track removed successfully!");

      const result = await service.removeTrackFromPlaylist("1", 1);

      expect(result).toBe("Track removed successfully!");
    });

    it("deve lançar erro se a faixa não for removida", async () => {
      mock.removeTrackFromPlaylistDB.mockResolvedValue(null as any);

      await expect(service.removeTrackFromPlaylist("1", 1))
        .rejects
        .toThrow("Track not removed. Try again!");
    });
  });

  describe("listTracksFromPlaylist", () => {
    it("Should list all tracks in a playlist", async () => {

      mock.listTracksFromPlaylistDB.mockResolvedValue([trackData]);

      const result = await service.listTracksFromPlaylist("1");

      expect(result).toEqual([trackData]);
    });
  });
});