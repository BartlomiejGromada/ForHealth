import { documents } from "./paths";

export const visitByIdDoc = (userId: string, visitId: string) =>
  documents.visitById(userId, visitId);
