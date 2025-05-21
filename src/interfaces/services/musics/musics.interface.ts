export interface IAlbumData {
  id: number;
  title: string;
  image: string;
  tracklist: string;
  artist: {
    id: number,
    name: string
  }
}

export interface ITrackData {
  id: number;
  title: string;
  duration: number;
  preview: string;
  artist: {
    id: number,
    name: string
  }
}


interface IMusicsService {
  getAlbums(): Promise<IAlbumData[]>;
  getTracklistByAlbum(id: number): Promise<ITrackData[]>;
}

export default IMusicsService;
