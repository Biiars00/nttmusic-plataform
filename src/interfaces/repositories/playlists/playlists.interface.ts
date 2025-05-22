import { ITrackData } from "../../../interfaces/services/musics/musics.interface";

export interface IPlaylistData {
  playlistId: string;
  name: string;
}

interface IPlaylistsRepository {
    addPlaylistDB(name: string, userId: string): Promise<string>;
    getPlaylistDB(userId: string): Promise<IPlaylistData[]>;
    removePlaylistDB(playlistId: string, userId: string): Promise<string>;
    updateNamePlaylistDB(playlistId: string, name: string, userId: string): Promise<string>;
    listTracksFromPlaylistDB(playlistId: string, userId: string): Promise<ITrackData[]>;
    addTrackToPlaylistDB(playlistId: string, track: ITrackData, userId: string): Promise<string>;
    removeTrackFromPlaylistDB(playlistId: string, trackId: number, userId: string): Promise<string>;
}

export default IPlaylistsRepository;