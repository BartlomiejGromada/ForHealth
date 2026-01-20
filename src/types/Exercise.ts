export type Exercise = {
  id: string;
  name: string;
  date: Date;
  durationInMin: number;
  intensity: IntensityEnum;
};

export enum IntensityEnum {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}
