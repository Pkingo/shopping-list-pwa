import { Box, Divider, Typography } from "@material-ui/core";
import { SvgIconComponent } from "@material-ui/icons";
import { FC } from "react";
import theme from "./theme";

interface SectionHeaderProps {
  title: string;
  Icon: SvgIconComponent;
  noMarginBottom?: boolean;
}

export const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  Icon,
  noMarginBottom,
}) => {
  return (
    <Box
      display="flex"
      alignItems="start"
      sx={{ mb: noMarginBottom ? 0 : 2 }}
      height={theme.spacing(3.5)}
      color="InfoText"
    >
      <Box mr={1}>{<Icon color="inherit" fontSize="small" />}</Box>
      <Box display="flex" alignItems="baseline" width="100%">
        <Box mr={1}>
          <Typography
            variant="h6"
            color="inherit"
            sx={{ margin: 0, whiteSpace: "nowrap" }}
          >
            {title}
          </Typography>
        </Box>
        <Box bgcolor="inherit" width="100%">
          <Divider />
        </Box>
      </Box>
    </Box>
  );
};
