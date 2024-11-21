import { Button } from "@mui/material";
import { useAuthStore } from "../store/useAuthStore";
export const CustomButton = ({
  action,
  icon,
  color = "primary",
  text,
  variant = "text", //"text", "outlined", "contained"
  denegateRols = [],
  ...props
}) => {
  const { currentUser } = useAuthStore();

  return (
    <Button
      disabled={denegateRols.includes(currentUser.rol)}
      startIcon={icon}
      color={color}
      variant={variant}
      onClick={() => action()}
      {...props}
    >
      {text}
    </Button>
  );
};
