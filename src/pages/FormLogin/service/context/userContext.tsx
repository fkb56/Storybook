import React, {createContext, ReactNode, useState} from "react";

export const UserContext: React.Context<{}> = createContext({});

export function UserProvider({children}: Readonly<{ children: ReactNode }>) {
	const [user, setUser] = useState(null);

	return (
		<UserContext.Provider value={{user, setUser}}>
			{children}
		</UserContext.Provider>
	);
}