import { request } from "../request";

const actorService = {
  getActor: (Id: string) => request.get(`/Actor/${Id}`),

  getAllActors: (pageNumber: number, pageSize: number) =>
    request.get(`/Actor?pageNumber=${pageNumber}&pageSize=${pageSize}`),
};

export default actorService;
