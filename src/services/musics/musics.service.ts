import IMusicsService, { IAlbumData, ITrackData } from "../../interfaces/services/musics/musics.interface";
import DeezerMusicGateway from "../../gateways/deezerMusic.gateway";
import { inject, injectable } from "tsyringe";

@injectable()
class MusicsService implements IMusicsService {
  constructor(
    @inject("DeezerMusicGateway")
    private deezerMusicGateway: DeezerMusicGateway,
  ) {}

  async getAlbums(): Promise<IAlbumData[]> {
    const response = await this.deezerMusicGateway.getAlbums();

    if (!response) {
        throw new Error("Resource not found!");
    }

    const albumsList = response.albums.data.map((album: any) => {
        const data = {
            id: album.id,
            title: album.title,
            image: album?.cover,
            tracklist: album.tracklist,
            artist: {
                id: album.artist.id,
                name: album.artist.name
            }
        }
        return data;
    });

    return albumsList;
  }

  async getTracklistByAlbum(id: number): Promise<ITrackData[]> {
    const response = await this.deezerMusicGateway.getTracklistByAlbum(id);

    if (!response) {
        throw new Error("Resource not found!");
    }

    const tracksList = response.data.map((track: any) => {
        const data = {
            id: track.id,
            title: track.title,
            duration: track.duration,
            preview: track.preview,
            artist: {
                id: track.artist.id,
                name: track.artist.name
            }
        }
        return data;
    });

    return tracksList;
  }
}

export default MusicsService;