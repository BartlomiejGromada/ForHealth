import { FIREBASE_UNKNOWN_ERROR_CODE, FIREBASE_UNKNOWN_ERROR_MESSAGE } from "@/constants/Firebase";
import { upcomingVisitsQuery } from "@/firebase/firestore/queries";
import { FirebaseReponse, ResponseStatus } from "@/types/Firebase";
import { Visit } from "@/types/Visit";
import { getCountFromServer, getDocs } from "firebase/firestore";

type getUpcomingVisitsRequestType = {
  userId: string;
  count?: number;
};

export async function getUpcomingVisitsRequest({
  userId,
  count,
}: getUpcomingVisitsRequestType): Promise<FirebaseReponse<Visit[]>> {
  const query = upcomingVisitsQuery(userId, count);

  try {
    const snapshot = await getDocs(query);

    const visits: Visit[] = snapshot.docs.map(doc => ({
      id: doc.id,
      status: doc.data().status,
      doctor: {
        name: doc.data().doctor.name,
        profession: doc.data().doctor.profession,
      },
      date: doc.data().date.toDate(),
      createdAt: doc.data().createdAt.toDate(),
      location: doc.data().location,
      comment: doc.data().comment,
    }));

    return {
      status: ResponseStatus.SUCCESS,
      payload: visits,
    };
  } catch (error: any) {
    const reponseError: FirebaseReponse<Visit[]> = {
      status: ResponseStatus.ERROR,
      error: {
        code: (error.code as string) ?? FIREBASE_UNKNOWN_ERROR_CODE,
        message: (error.message as string) ?? FIREBASE_UNKNOWN_ERROR_MESSAGE,
      },
    };

    return reponseError;
  }
}

type getUpcomingVisitsCountRequestType = {
  userId: string;
};

export async function getUpcomingVisitsCountRequest({
  userId,
}: getUpcomingVisitsCountRequestType): Promise<FirebaseReponse<number>> {
  const query = upcomingVisitsQuery(userId);

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
