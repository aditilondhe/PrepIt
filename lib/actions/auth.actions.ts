'use server'

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";
import { success } from "zod/v4-mini";

const one_week = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection('users').doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: 'User already exists. Please sign in instead'
      }
    }

    await db.collection('users').doc(uid).set({
      name, email
    })

    return {
      success: true,
      message: 'Account created successfully. Please Sign in.'
    }
  } catch (error: any) {
    console.error('Error creating user', error);

    if (error.code === 'auth/email-already-exists') {
      return {
        success: false,
        message: 'This email is already in use'
      }
    }
    return {
      success: false,
      message: 'Failed to create an account'
    }
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;
  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: 'User does not exist.Create an account instead'
      }
    }

    await setSessionCookie(idToken)
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'Failed to log into account'
    }

  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = cookies();
  const sessionCookie = auth.createSessionCookie(idToken, {
    expiresIn: one_week * 1000
  })
  cookieStore.set('session', sessionCookie, {
    maxAge: one_week,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax'
  })

}

