import { useMutation, useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import { graphql } from "./__generated__";

export type AuthContext = {
  isLoggedIn: boolean;
  sessionId:
  signIn: () => void;
};

const AuthContext = createContext<AuthContext | null>(null);

const MeQuery = graphql(`
  query MyQuery {
    me {
      id
      username
    }
  }
`);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data, loading, error } = useQuery(MeQuery);

  useEffect(() => {
    if (!loading && !error && data?.me) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [data, loading, error]);

  function signIn() {
    setIsLoggedIn(true);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useMeQuery() {
  return useQuery(MeQuery);
}

interface AuthInput {
  username: string;
  password: string;
}

const SignInMutation = graphql(`
  mutation SignIn($username: String!, $password: String!) {
    signIn(input: { username: $username, password: $password }) {
      username
    }
  }
`);

export function useSignIn(input: AuthInput) {
  const [mutate, { data, error, loading }] = useMutation(SignInMutation);

  return {
    mutate,
    data,
    error,
    loading,
  };
}
