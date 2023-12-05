import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useState } from 'react'
import { TypeUser } from '../types/user.type'

type TypeContext = {
	user: TypeUser
	setUser: Dispatch<SetStateAction<TypeUser>>
}

export const AuthContext = createContext<TypeContext>({
	user: { login: '' },
	setUser: () => {},
})

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [user, setUser] = useState<TypeUser>({ login: '' })

	return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}
export default AuthProvider
