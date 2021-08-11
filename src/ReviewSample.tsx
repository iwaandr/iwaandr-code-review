import React, { useState, useCallback, useRef, useEffect } from "react";

interface UserEntity {
  name: string;
  DOB?: string;
  email: string;
}

interface AuthFormProps {
  authUser: (email: string, password: string) => Promise<UserEntity>;
}

const AuthForm = ({ authUser }: AuthFormProps) => {
  const [isLoggedIn, setLogIn] = useState(false);
  const [user, setUser] = useState<UserEntity | undefined>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const renderLogIn = () => (
    <div>
      <h1>Log in</h1>
      <input placeholder={"Email"} ref={emailRef} />
      <input placeholder={"Password"} ref={passwordRef} />
      <button
        onClick={async (e) => {
          if (emailRef.current && passwordRef.current) {
            const user = await authUser(
              emailRef.current.value,
              passwordRef.current.value
            );
            setUser(user);
          }
          setLogIn(false);
        }}
      >
        Log In
      </button>
    </div>
  );

  return isLoggedIn ? renderLogIn() : <UserProfile user={user} />;
};

interface UserProfileProps {
  user?: UserEntity;
}

const UserProfile = ({ user }: UserProfileProps) => {
  if (!user) return null;

  const { name, DOB, email } = user;
  return (
    <div>
      <div>Hello, {name}!</div>
      <br />
      <div>{DOB}</div>
      <div>{email}</div>
    </div>
  );
};

export default AuthForm;
