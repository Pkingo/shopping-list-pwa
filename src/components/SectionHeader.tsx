import { Box, Divider, Typography } from "@material-ui/core";
import { SvgIconComponent } from "@material-ui/icons";
import { FC } from "react";
import theme from "./theme";

interface SectionHeaderProps {
  title: string;
  Icon: SvgIconComponent;
}

export const SectionHeader: FC<SectionHeaderProps> = ({ title, Icon }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{ mb: 2 }}
      height={theme.spacing(3.5)}
    >
      <Box mr={1}>{<Icon color="info" fontSize="small" />}</Box>
      <Box display="flex" alignItems="baseline" width="100%">
        <Box color="info" mr={1}>
          <Typography sx={{ margin: 0, whiteSpace: "nowrap" }}>
            {title}
          </Typography>
        </Box>
        <Box bgcolor="info" width="100%">
          <Divider />
        </Box>
      </Box>
    </Box>
  );
};
