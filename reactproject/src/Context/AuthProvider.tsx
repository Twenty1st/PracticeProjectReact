import { FC, PropsWithChildren, createContext, useState } from 'react'

type TypeContext = {
	IsAuthenticated: boolean
}

export const AuthContext = createContext<TypeContext>({
	IsAuthenticated: false,
})

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [IsAuthenticated, setIsAuthenticated] = useState(false)

	const contextValue: TypeContext = {
		IsAuthenticated,
	}

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export default AuthProvider
