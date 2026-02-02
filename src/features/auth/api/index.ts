import { FIREBASE_UNKNOWN_ERROR_CODE, FIREBASE_UNKNOWN_ERROR_MESSAGE } from "@/constants/Firebase";
import { auth } from "@/firebase/firebaseConfig";
import { profileDetailsDoc } from "@/firebase/firestore/documents";
import { FirebaseReponse, FirebaseReponseWithoutPayload, ResponseStatus } from "@/types/Firebase";
import { User } from "@/types/User";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDoc } from "firebase/firestore";

export async function signInRequest(
  email: string,
  password: string
): Promise<FirebaseReponse<User>> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const firebaseUser = userCredential.user;

    const profileSnapshot = await getDoc(profileDetailsDoc(firebaseUser.uid));

    const profileDetails = profileSnapshot.exists()
      ? profileSnapshot.data()
      : {
          firstName: null,
          lastName: null,
          dateOfBirth: null,
          height: null,
          weight: null,
        };

    const response: FirebaseReponse<User> = {
      status: ResponseStatus.SUCCESS,
      payload: {
        uid: firebaseUser.uid,
        email: firebaseUser.email ?? "-",
        details: {
          ...profileDetails,
          dateOfBirth: profileDetails.dateOfBirth?.toDate() ?? null,
        },
      },
    };

    return response;
  } catch (error: any) {
    const responseError: FirebaseReponse<User> = {
      status: ResponseStatus.ERROR,
      error: {
        code: error?.code ?? FIREBASE_UNKNOWN_ERROR_CODE,
        message: error?.message ?? FIREBASE_UNKNOWN_ERROR_MESSAGE,
      },
    };

    return responseError;
  }
}

export async function signUpRequest(
  email: string,
  password: string
): Promise<FirebaseReponse<User>> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;

    const response: FirebaseReponse<User> = {
      status: ResponseStatus.SUCCESS,
      payload: {
        uid: user.uid,
        email: user.email ?? "-",
        details: {
          firstName: null,
          lastName: null,
          dateOfBirth: null,
          height: null,
          weight: null,
        },
      },
    };

    return response;
  } catch (error: any) {
    const responseError: FirebaseReponse<User> = {
      status: ResponseStatus.ERROR,
      error: {
        code: error?.code ?? FIREBASE_UNKNOWN_ERROR_CODE,
        message: error?.message ?? FIREBASE_UNKNOWN_ERROR_MESSAGE,
      },
    };

    return responseError;
  }
}

export async function resetPasswordRequest(email: string): Promise<FirebaseReponseWithoutPayload> {
  try {
    await sendPasswordResetEmail(auth, email);

    const response: FirebaseReponseWithoutPayload = {
      status: ResponseStatus.SUCCESS,
    };

    return response;
  } catch (error: any) {
    const responseError: FirebaseReponseWithoutPayload = {
      status: ResponseStatus.ERROR,
      error: {
        code: error?.code ?? FIREBASE_UNKNOWN_ERROR_CODE,
        message: error?.message ?? FIREBASE_UNKNOWN_ERROR_MESSAGE,
      },
    };

    return responseError;
  }
}
