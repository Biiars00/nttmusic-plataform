import { injectable } from "tsyringe";
import axios from "axios";
import IDeezerMusicGateway from "../interfaces/gateways/deezerMusic.interface";

@injectable()
class DeezerMusicGateway implements IDeezerMusicGateway {
  constructor() {}

  async getAlbums(): Promise<any> {
    try {
      const response = await axios.get("https://api.deezer.com/chart");

      if (!response) {
        throw new Error("Albums not found!")
      }

      return response.data;
    } catch (error) {
      console.error("Error when searching for albums: ", error);
      throw new Error("Error when searching for albums");
    }
  }

  async getTracklistByAlbum(id: number): Promise<any> {
    try {
      const response = await axios.get(`https://api.deezer.com/album/${id}/tracks`);

      if (!response) {
        throw new Error("Musics not found!")
      }

      return response.data;
    } catch (error) {
      console.error("Error when searching for tracks: ", error);
      throw new Error("Error when searching for tracks");
    }
  }
}

export default DeezerMusicGateway;