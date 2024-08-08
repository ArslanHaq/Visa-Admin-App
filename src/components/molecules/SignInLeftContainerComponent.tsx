'use client';
import Link from 'next/link';

import { ChangeEvent, useEffect, useState } from 'react';
import { Pages } from '@/constants/constants';
import { handleChangeSignIn } from '@/constants/functions';
import { useSignIn } from '@/hooks/useSignIn';
// import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ArrowRightSvg from '../atoms/Svg/ArrowRight';
import { OriginDto } from '../organisms/Signup.dto';
import InputComponent from '../atoms/InputComponent';
import classNames from 'classnames';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

interface Props {
  origin: OriginDto;
}
export default function SignInLeftContainerComponent({ origin }: Props) {
  const router = useRouter();
  const coatSrc = origin.data?.coat.replace('+html', '+xml');

  const { formValues, errors, setFormValues, setErrors, handleSubmit } =
    useSignIn();
  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Prevent default redirect
    router.push(Pages.SIGNIN); // Redirect to the desired URL
  };
  useEffect(() => {
    handleSignOut();
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex h-screen justify-center items-center"
      >
        <div className="w-full">
          <div className="mb-10 -mt-5 -ml-10 flex justify-center">
            <div className={classNames("flex items-center justify-start ")}>
              <Image
                src={coatSrc}
                alt="Picture of the author"
                width={90}
                height={90}
                quality={100}
                style={{
                  maxWidth: '80px',
                  minWidth: '90px',
                  maxHeight: '90px',
                  minHeight: '90px',
                }}
              />
              <div className='text-center'>
                <p className="mx-2 font-serif text-xl font-bold text-logoColorBlue">
                  Online Visa System
                </p>
                <p className="mx-2 font-sans text-sm font-bold text-logoColorGreen italic">
                  {origin.data?.countryFullName}
                </p>

              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <p className="font-serif text-2xl font-bold text-logoColorBlue lg:text-5xl">
              Sign In
            </p >
          </div >
          <div className="mt-5 flex justify-center">
            <p className="text-xs text-logoColorGreen lg:text-base">
              Login to your {origin.data?.countryName} visa system account
            </p>
          </div>
          <div className="mt-10 flex justify-center">
            <InputComponent
              label={'Email'}
              maxLength={36}
              type={'text'}
              placeholder={'Enter your email address'}
              name={'userName'}
              value={formValues.userName}
              className="md:w-1/2 w-10/12"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChangeSignIn(
                  e,
                  formValues,
                  setFormValues,
                  errors,
                  setErrors,
                )
              }
              error={errors.userName}
            />
          </div>
          <div className="mt-6 flex justify-center">
            <InputComponent
              label={'Password'}
              maxLength={20}
              type={'password'}
              placeholder={'Enter your password'}
              name={'password'}
              value={formValues.password}
              className="md:w-1/2 w-10/12"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChangeSignIn(
                  e,
                  formValues,
                  setFormValues,
                  errors,
                  setErrors,
                )
              }
              error={errors.password}
            />
          </div>
          <div className="mt-12 flex justify-center">
            <button
              type="submit"
              className="md:w-1/2 w-10/12
            rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-4 text-base text-white"
            >
              Sign In
            </button>
          </div>
        </div >
      </form >

    </>
  );
}
