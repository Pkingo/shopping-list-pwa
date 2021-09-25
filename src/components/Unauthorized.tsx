import { Stack, Typography } from "@material-ui/core";

export const Unauthorized = () => (
  <Stack padding={4}>
    <Typography textAlign="center" variant="h2">
      Unauthorized
    </Typography>
    <Typography textAlign="center" variant="body1">
      Log ind for at benytte siden
    </Typography>
  </Stack>
);
