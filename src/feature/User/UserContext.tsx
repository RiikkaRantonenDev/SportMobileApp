import React, { createContext, useContext, useState } from 'react';

interface IUserContext {
  username: string,
  updateUsername: (name:string) => void
}

export const UserContext = createContext<IUserContext>({
  username: "",
  updateUsername: () => {}
});

export const UserContextProvider: any = ({ children }: any) => {
  const [username, setUsername] = useState('');

  return (
    <UserContext.Provider value={{ username, updateUsername: setUsername }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const { username, updateUsername } = useContext(UserContext);
  return { username, updateUsername };
}