import { dataPoint, docPoint } from "./helpers";
import { ExerciseFirestore, VisitFirestore } from "./types";

export const collections = {
  visitsByUserId: (userId: string) => dataPoint<VisitFirestore>(`users/${userId}/visits`),
  exercisesByUserId: (userId: string) => dataPoint<ExerciseFirestore>(`users/${userId}/exercises`),
};

export const documents = {
  visitById: (userId: string, visitId: string) =>
    docPoint<VisitFirestore>(`users/${userId}/visits/${visitId}`),
};
