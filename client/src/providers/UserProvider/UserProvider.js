import * as React from "react";

const UserStateContext = React.createContext();
const UserUpdaterContext = React.createContext();

function UserProvider({ children }) {
  const [userState, setUserState] = React.useState({
    isLoggedIn: !!localStorage.getItem("token"),
    username: localStorage.getItem("token")
      ? localStorage.getItem("Username")
      : null,
  });

  return (
    <UserStateContext.Provider value={userState}>
      <UserUpdaterContext.Provider value={setUserState}>
        {children}
      </UserUpdaterContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  const userState = React.useContext(UserStateContext);
  if (typeof userState === "undefined") {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return userState;
}

function useUserUpdater() {
  const userUpdater = React.useContext(UserUpdaterContext);
  if (typeof userUpdater === "undefined") {
    throw new Error("useUserUpdater must be used within a UserProvider");
  }
  return React.useCallback(
    (newState) => userUpdater((prevState) => ({ ...prevState, ...newState })),
    [userUpdater]
  );
}

export { UserProvider, useUserState, useUserUpdater };
