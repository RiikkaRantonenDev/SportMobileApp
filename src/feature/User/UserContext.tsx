import React, { createContext, useContext, useState } from 'react';
import {IUser} from './../../interfaces/User'
import { ISportRecord } from '../../interfaces/SportRecord';

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