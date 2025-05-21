import { inject, injectable } from "tsyringe";
import { Body, Delete, Get, Path, Post, Put, Request as Request, Route, Security, Tags } from "tsoa";
import { ITrackData } from "../../interfaces/services/musics/musics.interface";
import PlaylistService from "../../services/playlists/playlists.service";
import { IPlaylistData } from "../../interfaces/repositories/playlists/playlists.interface";

@injectable()
@Route("/playlist")
@Tags("Playlists")
class PlaylistsController {
  constructor(
    @inject("PlaylistService")
    private playlistService: PlaylistService,
  ) {}

  @Post("/")
  @Security("jwt")
  async addPlaylist(@Body() body: { name: string }): Promise<string> {
    const { name } = body;

    if (!name) {
      throw new Error("Name is required");
    }

    try {
      const response = await this.playlistService.addPlaylist(name);

      if (!response) {
        throw new Error("Resource not found!");
      }

      return response;
    } catch (error: any) {
      throw new Error(`Internal server error - ${error.message}`);
    }
  }

  @Get("/")
  @Security("jwt")
  async getPlaylist(): Promise<IPlaylistData[]> {
    try {
      const response = await this.playlistService.getPlaylist();

      if (!response) {
        throw new Error("Resource not found!");
      }

      return response;
    } catch (error: any) {
      throw new Error(`Internal server error - ${error.message}`);
    }
  }

  @Put("/:id")
  @Security("jwt")
  async updateNamePlaylist(@Path() id: string, @Body() body: { name: string } ): Promise<string> {
    const { name } = body;

    if (!name && !id) {
      throw new Error("Id and Name is required");
    }

    try {
      const response = await this.playlistService.updateNamePlaylist(id, name);

      if (!response) {
        throw new Error("Resource not found!");
      }

      return response;
    } catch (error: any) {
      throw new Error(`Internal server error - ${error.message}`);
    }
  }

  @Delete("/:id")
  @Security("jwt")
  async removePlaylist(@Path() id: string): Promise<string> {
    try {
      const response = await this.playlistService.removePlaylist(id);

      if (!response) {
        throw new Error("Resource not found!");
      }

      return response;
    } catch (error: any) {
      throw new Error(`Internal server error - ${error.message}`);
    }
  }

  @Get("/:id")
  @Security("jwt")
  async listTracksFromPlaylist(id: string): Promise<ITrackData[]> {
    try {
      const response = await this.playlistService.listTracksFromPlaylist(id);

      if (!response) {
        throw new Error("Resource not found!");
      }

      return response;
    } catch (error: any) {
      throw new Error(`Internal server error - ${error.message}`);
    }
  }

  @Post("/:id")
  @Security("jwt")
  async addTrackToPlaylist(@Path() id: string, @Body() track: ITrackData): Promise<string> {
    try {
      const response = await this.playlistService.addTrackToPlaylist(id, track);

      if (!response) {
        throw new Error("Resource not found!");
      }

      return response;
    } catch (error: any) {
      throw new Error(`Internal server error - ${error.message}`);
    }
  }

  @Delete("/:id/:trackId")
  @Security("jwt")
  async removeTrackFromPlaylist(@Path() id: string, trackId: number): Promise<string> {
    try {
      const response = await this.playlistService.removeTrackFromPlaylist(id, trackId);

      if (!response) {
        throw new Error("Resource not found!");
      }

      return response;
    } catch (error: any) {
      throw new Error(`Internal server error - ${error.message}`);
    }
  }
}

export default PlaylistsController ;