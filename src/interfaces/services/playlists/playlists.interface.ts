import { IPlaylistData } from "../../../interfaces/repositories/playlists/playlists.interface";
import { ITrackData } from "../musics/musics.interface";

interface IPlaylistService {
  addPlaylist(name: string, userId: string): Promise<string>;
  getPlaylist(userId: string): Promise<IPlaylistData[]>;
  removePlaylist(playlistId: string, userId: string): Promise<string>;
  updateNamePlaylist(playlistId: string, name: string, userId: string): Promise<string>;
  addTrackToPlaylist(playlistId: string, track: ITrackData, userId: string): Promise<string>;
  removeTrackFromPlaylist(playlistId: string, trackId: number, userId: string): Promise<string>;
  listTracksFromPlaylist(playlistId: string, userId: string): Promise<ITrackData[]>;
}

export default IPlaylistService;