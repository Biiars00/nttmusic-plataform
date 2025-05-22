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

    async addPlaylist(name: string, userId: string): Promise<string> {
        const responseDB = await this.playlistsRepository.addPlaylistDB(name, userId);

        if (!responseDB) {
            throw new Error("Playlist not added. Try again!")
        }

        return responseDB;
    }

    async getPlaylist(userId: string): Promise<IPlaylistData[]> {
        const playlists = await this.playlistsRepository.getPlaylistDB(userId);

        return playlists;
    }

    async updateNamePlaylist(playlistId: string, name: string, userId: string): Promise<string> {
        const responseDB = await this.playlistsRepository.updateNamePlaylistDB(playlistId, name, userId);

        if (!responseDB) {
            throw new Error("Playlist name not update. Try again!")
        }

        return responseDB;
    }

    async removePlaylist(playlistId: string, userId: string): Promise<string> {
        const responseDB = await this.playlistsRepository.removePlaylistDB(playlistId, userId);

        if (!responseDB) {
            throw new Error("Playlist not removed. Try again!")
        }

        return responseDB;
    }

    async addTrackToPlaylist(playlistId: string, track: ITrackData, userId: string): Promise<string> {
        const addTrackDB = await this.playlistsRepository.addTrackToPlaylistDB(playlistId, track, userId);

        if (!addTrackDB) {
            throw new Error("Track not added. Try again!")
        }

        return addTrackDB;
    }

    async removeTrackFromPlaylist(playlistId: string, trackId: number, userId: string): Promise<string> {
        const removeTrackDB = await this.playlistsRepository.removeTrackFromPlaylistDB(playlistId, trackId, userId);

        if (!removeTrackDB) {
            throw new Error("Track not removed. Try again!")
        }

        return removeTrackDB;
    }

    async listTracksFromPlaylist(playlistId: string, userId: string): Promise<ITrackData[]> {
        const responseDB = await this.playlistsRepository.listTracksFromPlaylistDB(playlistId, userId);

        return responseDB;
    }
}

export default PlaylistService;