// import { Api } from "./api";
// import { RabotaListResponse, RabotaResponse } from "@/types/rabota";

// async function createOne(name: string, location: string, price:string, duration:string, coment:string, date: string): Promise<RabotaResponse> {
//   return Api.post("/rabota", { name, location, price, duration, coment, date });
// }

// async function getOne(id: number): Promise<RabotaResponse> {
//   return Api.get(`/rabota/${id}`);
// }

// async function getAll(): Promise<RabotaListResponse> {
//   return Api.get("/rabota");
// }

// async function updateOne(id: number, name: string, location: string, price:string, duration:string, coment:string, date: string): Promise<RabotaResponse> {
//   return Api.put(`/rabota/${id}`, { name, location,price, duration, coment, date });
// } 

// async function deleteOne(id: number): Promise<RabotaResponse> {
//   return Api.delete(`/rabota/${id}`);
// }

// const RabotaService = {
//   createOne,
//   getOne,
//   getAll,
//   updateOne,
//   deleteOne,
// };

// export { RabotaService };
