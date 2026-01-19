import { FIREBASE_UNKNOWN_ERROR_CODE, FIREBASE_UNKNOWN_ERROR_MESSAGE } from "@/constants/Firebase";
import {
  FirebaseReponse,
  FirebaseReponseWithoutPayload,
  ResponseStatus,
  User,
} from "@/types/Firebase";
import { auth } from "@/firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export async function signInRequest(
  email: string,
  password: string
): Promise<FirebaseReponse<User>> {
  return signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;

      const reponse: FirebaseReponse<User> = {
        status: ResponseStatus.SUCCESS,
        payload: {
          uid: user.uid,
          name: user.displayName ?? "-",
          email: user.email ?? "-",
        },
      };

      return reponse;
    })
    .catch(error => {
      const reponseError: FirebaseReponse<User> = {
        status: ResponseStatus.ERROR,
        error: {
          code: (error.code as string) ?? FIREBASE_UNKNOWN_ERROR_CODE,
          message: (error.message as string) ?? FIREBASE_UNKNOWN_ERROR_MESSAGE,
        },
      };

      return reponseError;
    });
}

export async function signUpRequest(
  email: string,
  password: string,
  displayName: string
): Promise<FirebaseReponse<User>> {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;

      updateProfile(user, {
        displayName,
      });

      const reponse: FirebaseReponse<User> = {
        status: ResponseStatus.SUCCESS,
        payload: {
          uid: user.uid,
          name: displayName ?? "-",
          email: user.email ?? "-",
        },
      };

      return reponse;
    })
    .catch(error => {
      const reponseError: FirebaseReponse<User> = {
        status: ResponseStatus.ERROR,
        error: {
          code: (error.code as string) ?? FIREBASE_UNKNOWN_ERROR_CODE,
          message: (error.message as string) ?? FIREBASE_UNKNOWN_ERROR_MESSAGE,
        },
      };

      return reponseError;
    });
}

export async function resetPasswordRequest(email: string): Promise<FirebaseReponseWithoutPayload> {
  return sendPasswordResetEmail(auth, email)
    .then(() => {
      const reponse: FirebaseReponseWithoutPayload = {
        status: ResponseStatus.SUCCESS,
      };

      return reponse;
    })
    .catch(error => {
      const reponseError: FirebaseReponseWithoutPayload = {
        status: ResponseStatus.ERROR,
        error: {
          code: (error.code as string) ?? FIREBASE_UNKNOWN_ERROR_CODE,
          message: (error.message as string) ?? FIREBASE_UNKNOWN_ERROR_MESSAGE,
        },
      };

      return reponseError;
    });
}
