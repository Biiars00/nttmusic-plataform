import { injectable } from 'tsyringe';
import databaseConfig from '../../config/databaseConfig';
import IPlaylistsRepository, { IPlaylistData } from '../../interfaces/repositories/playlists/playlists.interface';
import { ITrackData } from '../../interfaces/services/musics/musics.interface';

@injectable()
class PlaylistsRepository
  implements IPlaylistsRepository
{
  private db;

  constructor() {
    this.db = databaseConfig.firestore().collection('playlist');
  }

  async addPlaylistDB(name: string): Promise<string> {
    const refDB = this.db;
    const docRef = refDB.doc();
    const id = docRef.id;

    const docData = await refDB.get();
    docData.docs.map((doc) => {
      if (name === doc.data().name) {
        console.error('Playlist already exists!');
        throw new Error('Playlist already exists!');
      }
    })

    await docRef.set({
      id: id,
      name: name
    })

    return 'Playlist added successfully!';
  }

  async getPlaylistDB(): Promise<IPlaylistData[]> {
    const refDB = await this.db.get();
    
    const playlists = refDB.docs.map((doc) => {
      const docData = doc.data() as IPlaylistData;

      if (docData) {
        return docData;
      } else {
        throw new Error("Document not found!");
      }
    });

    return playlists;
  }

  async removePlaylistDB(playlistId: string): Promise<string> {
    const refDB = await this.db.doc(playlistId.toString()).get();

    if (refDB.exists) {
      refDB.ref.delete();

      return 'Playlist removed successfully!';
    } else {
      throw new Error('Document not found!');
    }
  }

  async updateNamePlaylistDB(id: string, name: string): Promise<string> {
    const refDB = this.db;
    const docRef = await refDB.doc(id).get();

    if (docRef.exists) {
      docRef.ref.update({ name: name })

      return 'Playlist name updated successfully!';
    } else {
      throw new Error('Document not found!');
    }
  }

  async listTracksFromPlaylistDB(playlistId: string): Promise<ITrackData[]> {
    const refDB = await this.db.doc(playlistId).collection('tracks').get();

    const playlist = refDB.docs.map((doc) => {
      const docData = doc.data() as ITrackData;

      if (docData) {
        return docData || [];
      } else {
        throw new Error('Data not found!');
      }
    });

    return playlist;
  }

  async addTrackToPlaylistDB(playlistId: string, track: ITrackData): Promise<string> {
    const refDB = this.db.doc(playlistId).collection('tracks')
    
    await refDB.doc(track.id.toString()).set(track);

    return 'Track added successfully!';
  }

  async removeTrackFromPlaylistDB(playlistId: string, trackId: number): Promise<string> {
    const refDB = await this.db
      .doc(playlistId)
      .collection('tracks')
      .doc(trackId.toString())
      .get();

    if (refDB.exists) {
      refDB.ref.delete();

      return 'Track removed successfully!';
    } else {
      throw new Error('Document not found!');
    }
  }
}

export default PlaylistsRepository;
