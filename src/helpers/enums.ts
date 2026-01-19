import { DoctorProfession, VisitStatus } from "@/types/Visit";

export const doctorTypeTranslationKeys: Record<DoctorProfession, string> = {
  [DoctorProfession.Pediatrician]: "common.doctor-types.pediatrician",
  [DoctorProfession.Cardiologist]: "common.doctor-types.cardiologist",
  [DoctorProfession.Dermatologist]: "common.doctor-types.dermatologist",
  [DoctorProfession.FamilyDoctor]: "common.doctor-types.family-doctor",
  [DoctorProfession.Physiotherapist]: "common.doctor-types.physiotherapist",
  [DoctorProfession.Neurologist]: "common.doctor-types.neurologist",
  [DoctorProfession.Orthopaedist]: "common.doctor-types.orthopaedist",
};

export const visitStatusTranslationKeys: Record<VisitStatus, string> = {
  [VisitStatus.New]: "visits.statuses.new",
  [VisitStatus.Canceled]: "visits.statuses.canceled",
  [VisitStatus.Finished]: "visits.statuses.finished",
};
