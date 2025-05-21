import { container } from "tsyringe";
import DeezerMusicGateway from "../../gateways/deezerMusic.gateway";
import MusicsController from "../../controllers/musics/musics.controller";
import MusicsService from "../../services/musics/musics.service";

container.register("DeezerMusicGateway", {
  useClass: DeezerMusicGateway,
});
container.register("MusicsController", {
  useClass: MusicsController,
});
container.register("MusicsService", {
  useClass: MusicsService,
});

export { container as musics };