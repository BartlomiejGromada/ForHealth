import { DoctorProfession, VisitStatus } from "@/types/Visit";
import { Timestamp } from "firebase/firestore";

export type VisitFirestore = {
  status: VisitStatus;
  doctor: {
    name: string;
    profession: DoctorProfession;
  };
  date: Timestamp;
  createdAt: Timestamp;
  location: string;
  comment: string;
};

export type ExerciseFirestore = {
  name: string;
  date: Timestamp;
  durationInMin: number;
  intensity: string;
};
