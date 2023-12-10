import React, { createContext, useState, ReactNode } from "react";

export const UserContext: React.Context<{}> = createContext({});

export function UserProvider({children}: { children: ReactNode }) {
	const [user, setUser] = useState(null);

	return (
		<UserContext.Provider value={{user, setUser}}>
			{children}
		</UserContext.Provider>
	);
}