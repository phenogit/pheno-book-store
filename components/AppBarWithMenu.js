import React from "react";
import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function AppBarWithMenu() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="選單"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pheno 書店
          </Typography>
          <div>
            <IconButton>
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
