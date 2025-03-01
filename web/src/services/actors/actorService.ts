import { request } from "../api";

const actorService = {
  getAllActors: (pageNumber: number, pageSize: number) =>
    request.get<any>(
      `https://localhost:7183/api/Actor?pageNumber=${pageNumber}&pageSize=${pageSize}`
    ),

  updateActor: (id: number, actor: any) =>
    request.put<any>(`https://localhost:7183/api/Actor?id=${id}`, actor),
  createActor: (actor: { Name: string; Gender: string; Country: string }) =>
    request.post<any>(`https://localhost:7183/api/Actor`, actor),
};

export default actorService;
