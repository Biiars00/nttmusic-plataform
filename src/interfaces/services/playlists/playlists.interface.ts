import { IPlaylistData } from "../../../interfaces/repositories/playlists/playlists.interface";
import { ITrackData } from "../musics/musics.interface";

interface IPlaylistService {
  addPlaylist(name: string): Promise<string>;
  getPlaylist(): Promise<IPlaylistData[]>;
  removePlaylist(playlistId: string): Promise<string>;
  updateNamePlaylist(id: string, name: string): Promise<string>;
  addTrackToPlaylist(playlistId: string, track: ITrackData): Promise<string>;
  removeTrackFromPlaylist(playlistId: string, trackId: number): Promise<string>;
  listTracksFromPlaylist(playlistId: string): Promise<ITrackData[]>;
}

export default IPlaylistService;