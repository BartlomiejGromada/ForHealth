import { FIREBASE_UNKNOWN_ERROR_CODE, FIREBASE_UNKNOWN_ERROR_MESSAGE } from "@/constants/Firebase";
import { exercisesQuery } from "@/firebase/firestore/queries";
import { DateRange } from "@/types/Common";
import { Exercise } from "@/types/Exercise";
import { FirebaseReponse, ResponseStatus } from "@/types/Firebase";
import { getCountFromServer, getDocs } from "firebase/firestore";

type getExercisesRequestType = {
  userId: string;
  count?: number;
  range?: DateRange;
};

export async function getExercisesRequest({
  userId,
  count,
  range,
}: getExercisesRequestType): Promise<FirebaseReponse<Exercise[]>> {
  const query = exercisesQuery(userId, count, range);

  try {
    const snapshot = await getDocs(query);

    const exercises: Exercise[] = snapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      date: doc.data().date.toDate(),
      durationInMin: doc.data().durationInMin,
      intensity: doc.data().intensity,
    }));

    return {
      status: ResponseStatus.SUCCESS,
      payload: exercises,
    };
  } catch (error: any) {
    const reponseError: FirebaseReponse<Exercise[]> = {
      status: ResponseStatus.ERROR,
      error: {
        code: (error.code as string) ?? FIREBASE_UNKNOWN_ERROR_CODE,
        message: (error.message as string) ?? FIREBASE_UNKNOWN_ERROR_MESSAGE,
      },
    };

    return reponseError;
  }
}

type getExercisesCountRequestType = {
  userId: string;
  count?: number;
  range?: DateRange;
};

export async function getExercisesCountRequest({
  userId,
  count,
  range,
}: getExercisesCountRequestType): Promise<FirebaseReponse<number>> {
  const query = exercisesQuery(userId, count, range);

  try {
    const snapshot = await getCountFromServer(query);

    return {
      status: ResponseStatus.SUCCESS,
      payload: snapshot.data().count,
    };
  } catch (error: any) {
    const reponseError: FirebaseReponse<number> = {
      status: ResponseStatus.ERROR,
      error: {
        code: (error.code as string) ?? FIREBASE_UNKNOWN_ERROR_CODE,
        message: (error.message as string) ?? FIREBASE_UNKNOWN_ERROR_MESSAGE,
      },
    };

    return reponseError;
  }
}
