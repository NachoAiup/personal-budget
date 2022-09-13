import { UserProvider } from "./UserProvider";
import { SnackbarProvider } from "./SnackbarProvider";

const Providers = ({ children }) => {
  return (
    <UserProvider>
      <SnackbarProvider>{children}</SnackbarProvider>
    </UserProvider>
  );
};

export default Providers;
