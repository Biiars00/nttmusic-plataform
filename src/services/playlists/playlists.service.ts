import { inject, injectable } from "tsyringe";
import IPlaylistService from "../../interfaces/services/playlists/playlists.interface";
import { ITrackData } from "../../interfaces/services/musics/musics.interface";
import IPlaylistsRepository, { IPlaylistData } from "../../interfaces/repositories/playlists/playlists.interface";
import { request } from "express";

@injectable()
class PlaylistService implements IPlaylistService {
    constructor(
        @inject("PlaylistsRepository")
        private playlistsRepository: IPlaylistsRepository,
    ) {}

    async addPlaylist(name: string): Promise<string> {
        const responseDB = await this.playlistsRepository.addPlaylistDB(name);

        if (!responseDB) {
            throw new Error("Playlist not added. Try again!")
        }

        return responseDB;
    }

    async getPlaylist(): Promise<IPlaylistData[]> {
        const playlists = await this.playlistsRepository.getPlaylistDB();

        return playlists;
    }

    async updateNamePlaylist(id: string, name: string): Promise<string> {
        const responseDB = await this.playlistsRepository.updateNamePlaylistDB(id, name);

        if (!responseDB) {
            throw new Error("Playlist name not update. Try again!")
        }

        return responseDB;
    }

    async removePlaylist(playlistId: string): Promise<string> {
        const responseDB = await this.playlistsRepository.removePlaylistDB(playlistId);

        if (!responseDB) {
            throw new Error("Playlist not removed. Try again!")
        }

        return responseDB;
    }

    async addTrackToPlaylist(playlistId: string, track: ITrackData): Promise<string> {
        const addTrackDB = await this.playlistsRepository.addTrackToPlaylistDB(playlistId, track);

        if (!addTrackDB) {
            throw new Error("Track not added. Try again!")
        }

        return addTrackDB;
    }

    async removeTrackFromPlaylist(playlistId: string, trackId: number): Promise<string> {
        const removeTrackDB = await this.playlistsRepository.removeTrackFromPlaylistDB(playlistId, trackId);

        if (!removeTrackDB) {
            throw new Error("Track not removed. Try again!")
        }

        return removeTrackDB;
    }

    async listTracksFromPlaylist(playlistId: string): Promise<ITrackData[]> {
        const responseDB = await this.playlistsRepository.listTracksFromPlaylistDB(playlistId);

        return responseDB;
    }
}

export default PlaylistService;