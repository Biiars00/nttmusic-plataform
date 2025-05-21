import { ITrackData } from "../../../interfaces/services/musics/musics.interface";

export interface IPlaylistData {
  id: string;
  name: string;
}

interface IPlaylistsRepository {
    addPlaylistDB(name: string): Promise<string>;
    getPlaylistDB(): Promise<IPlaylistData[]>;
    removePlaylistDB(playlistId: string): Promise<string>;
    updateNamePlaylistDB(pid: string, name: string): Promise<string>;
    listTracksFromPlaylistDB(playlistId: string): Promise<ITrackData[]>;
    addTrackToPlaylistDB(playlistId: string, track: ITrackData): Promise<string>;
    removeTrackFromPlaylistDB(playlistId: string, trackId: number): Promise<string>;
}

export default IPlaylistsRepository;