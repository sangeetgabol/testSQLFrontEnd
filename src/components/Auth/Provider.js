import React, { useEffect, useState } from "react";

import UserContext from "./Context";

import { getCurrentUser } from "./API";

export default function Provider(props) {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const login = (user) => setUser(user);

  const joinGroup = (group) =>
    setUser((prevState) => ({ user: { ...prevState.user, group } }));

  const leaveGroup = () =>
    setUser((prevState) => ({
      user: { ...prevState.user, group: null },
    }));

  const refresh = async () => {
    try {
      const user = process.env.REACT_APP_CLIENT_ONLY
        ? null
        : await getCurrentUser();
      setIsLoaded(true);
      setUser(user);
    } catch (e) {
      setIsLoaded(true);
      setUser(null);
    }
  };

  const logout = () => setUser(null);

  const state = {
    user: user,
    isLoaded: isLoaded,
    login: login,
    joinGroup: joinGroup,
    leaveGroup: leaveGroup,
    refresh: refresh,
    logout: logout,
  };
  useEffect(() => {
    refresh();
  }, []);
  return (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  );
}
