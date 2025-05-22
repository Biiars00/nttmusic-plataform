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

  async addPlaylistDB(name: string, userId: string): Promise<string> {
    const refDB = this.db;

    const docRef = await refDB.add({
      name: name,
      userId: userId
    });

    docRef.update({ playlistId: docRef.id});

    return 'Playlist added successfully!';
  }

  async getPlaylistDB(userId: string): Promise<IPlaylistData[]> {
    const refDB = await this.db.where('userId', '==', userId).get();
    
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

  async removePlaylistDB(playlistId: string, userId: string): Promise<string> {
    const refDB = this.db.doc(playlistId.toString());
    const doc = await refDB.get();

    if (doc.exists && doc.data()?.userId === userId) {
      await refDB.delete();

      return 'Playlist removed successfully!';
    }  else {
      throw new Error('Document not found!');
    }
  }

  async updateNamePlaylistDB(playlistId: string, name: string, userId: string): Promise<string> {
    const refDB = this.db.doc(playlistId);
    const docRef = await refDB.get();

    if (docRef.exists && docRef.data()?.userId === userId) {
      docRef.ref.update({ name: name })

      return 'Playlist name updated successfully!';
    } else {
      throw new Error('Document not found!');
    }
  }

  async listTracksFromPlaylistDB(playlistId: string, userId: string): Promise<ITrackData[]> {
    const refDB = await this.db.doc(playlistId).collection('tracks').where('userId', '==', userId).get();

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

  async addTrackToPlaylistDB(playlistId: string, track: ITrackData, userId: string): Promise<string> {
    const refDB = this.db.doc(playlistId).collection('tracks');
    
    await refDB.doc(track.id.toString()).set({...track, userId: userId});

    return 'Track added successfully!';
  }

  async removeTrackFromPlaylistDB(playlistId: string, trackId: number, userId: string): Promise<string> {
    const refDB = await this.db
      .doc(playlistId)
      .collection('tracks')
      .doc(trackId.toString())
      .get();

    if (refDB.exists && refDB.data()?.userId === userId) {
      refDB.ref.delete();

      return 'Track removed successfully!';
    } else {
      throw new Error('Document not found!');
    }
  }
}

export default PlaylistsRepository;
