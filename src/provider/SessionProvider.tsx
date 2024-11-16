"use client";
import { FC, ReactNode } from "react";
import { Session } from "next-auth";
import { SessionProvider as NextAuthProvider } from "next-auth/react";

interface ISessionProviderProps {
	children: ReactNode;
	session: Session | null;
}

const SessionProvider: FC<ISessionProviderProps> = ({ children, session }) => {
	return (
		<>
			<NextAuthProvider session={session}>{children}</NextAuthProvider>
		</>
	);
};

export default SessionProvider;
