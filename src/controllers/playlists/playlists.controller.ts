import { inject, injectable } from "tsyringe";
import { Body, Delete, Get, Path, Post, Put, Request as Request, Route, Security, Tags } from "tsoa";
import { ITrackData } from "../../interfaces/services/musics/musics.interface";
import PlaylistService from "../../services/playlists/playlists.service";
import { IPlaylistData } from "../../interfaces/repositories/playlists/playlists.interface";
import { AuthenticatedRequest } from "express";

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
  async addPlaylist(@Request() req: AuthenticatedRequest, @Body() body: { name: string }): Promise<string> {
    const { name } = body;

    if (!name) {
      throw new Error("Name is required");
    }

    try {
      const userId = req.user.userId;
      const response = await this.playlistService.addPlaylist(name, userId!);

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
  async getPlaylist(@Request() req: AuthenticatedRequest): Promise<IPlaylistData[]> {
    try {
      const userId = req.user.userId;
      const response = await this.playlistService.getPlaylist(userId!);

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
  async updateNamePlaylist(@Request() req: AuthenticatedRequest, @Path() id: string, @Body() body: { name: string } ): Promise<string> {
    const { name } = body;

    if (!name && !id) {
      throw new Error("Id and Name is required");
    }

    try {
      const userId = req.user.userId;
      const response = await this.playlistService.updateNamePlaylist(id, name, userId!);

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
  async removePlaylist(@Request() req: AuthenticatedRequest, @Path() id: string): Promise<string> {
    try {
      const userId = req.user.userId;
      const response = await this.playlistService.removePlaylist(id, userId!);

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
  async listTracksFromPlaylist(@Request() req: AuthenticatedRequest, @Path() id: string): Promise<ITrackData[]> {
    try {
      const userId = req.user.userId;
      const response = await this.playlistService.listTracksFromPlaylist(id, userId!);

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
  async addTrackToPlaylist(@Request() req: AuthenticatedRequest, @Path() id: string, @Body() track: ITrackData): Promise<string> {
    try {
      const userId = req.user.userId;
      const response = await this.playlistService.addTrackToPlaylist(id, track, userId!);

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
  async removeTrackFromPlaylist(@Request() req: AuthenticatedRequest, @Path() id: string, trackId: number): Promise<string> {
    try {
      const userId = req.user.userId;
      const response = await this.playlistService.removeTrackFromPlaylist(id, trackId, userId!);

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