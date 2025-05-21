import { inject, injectable } from "tsyringe";
import { Body, Get, Path, Route, Security, Tags } from "tsoa";
import MusicsService from "../../services/musics/musics.service";
import { IAlbumData, ITrackData } from "../../interfaces/services/musics/musics.interface";

@injectable()
@Route("/music")
@Tags("Músicas")
class MusicsController {
  constructor(
    @inject("MusicsService")
    private musicsService: MusicsService,
  ) {}

  @Get("/album")
  @Security("jwt")
  async getAlbums(): Promise<IAlbumData[]> {
    try {
      const response = await this.musicsService.getAlbums();

      if (!response) {
        throw new Error("Resource not found!");
      }

      return response;
    } catch (error: any) {
      throw new Error(`Internal server error - ${error.message}`);
    }
  }

  @Get("/album/tracklist/:id")
  @Security("jwt")
  async getTracklistByAlbum(@Path() id: number): Promise<ITrackData[]> {
    try {
      const response = await this.musicsService.getTracklistByAlbum(id);

      if (!response) {
        throw new Error("Resource not found!");
      }

      return response;
    } catch (error: any) {
      throw new Error(`Internal server error - ${error.message}`);
    }
  }
}

export default MusicsController;