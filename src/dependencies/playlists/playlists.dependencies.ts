import { container } from "tsyringe";
import PlaylistsController from "../../controllers/playlists/playlists.controller";
import PlaylistService from "../../services/playlists/playlists.service";
import PlaylistsRepository from "../../repositories/playlists/playlists.repository";

container.register("PlaylistsController", {
  useClass: PlaylistsController,
});
container.register("PlaylistService", {
  useClass: PlaylistService,
});
container.register("PlaylistsRepository", {
  useClass: PlaylistsRepository,
});

export { container as playlists };