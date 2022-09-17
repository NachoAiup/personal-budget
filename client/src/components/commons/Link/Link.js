import { Link as RouterLink } from "react-router-dom";
import MUILink from "@mui/material/Link";

const Link = ({ to, children, ...muiLinkProps }) => {
  return (
    <MUILink component={RouterLink} to={to} underline="none" {...muiLinkProps}>
      {children}
    </MUILink>
  );
};

export default Link;
