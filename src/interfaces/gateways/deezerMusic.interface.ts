interface IDeezerMusicGateway {
  getAlbums(): Promise<any>;
  getTracklistByAlbum(id: number): Promise<any>;
}

export default IDeezerMusicGateway;