import { limit, orderBy, query, QueryConstraint, Timestamp, where } from "firebase/firestore";
import { collections } from "./paths";
import { todayDateTime } from "@/helpers/dates";
import { DateRange } from "@/types/Common";

export const upcomingVisitsQuery = (userId: string, count?: number) => {
  const queryConstraints: QueryConstraint[] = [
    where("date", ">=", Timestamp.fromDate(todayDateTime())),
    orderBy("date"),
  ];

  if (count) {
    queryConstraints.push(limit(count));
  }

  return query(collections.visitsByUserId(userId), ...queryConstraints);
};

export const visitsQuery = (userId: string) => {
  const queryConstraints: QueryConstraint[] = [orderBy("date")];

  return query(collections.visitsByUserId(userId), ...queryConstraints);
};

export const exercisesQuery = (userId: string, count?: number, range?: DateRange) => {
  const queryConstraints: QueryConstraint[] = [orderBy("date")];

  if (count) {
    queryConstraints.push(limit(count));
  }

  if (range) {
    queryConstraints.push(
      where("date", ">=", Timestamp.fromDate(range.from)),
      where("date", "<=", Timestamp.fromDate(range.to))
    );
  }

  return query(collections.exercisesByUserId(userId), ...queryConstraints);
};
