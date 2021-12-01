import React from "react";
import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { signIn, signOut } from "next-auth/client";

export default function AppBarWithMenu({ session }) {
  const signInOrSignOut = session ? signOut : signIn;

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
          <>
            <IconButton
              size="large"
              aria-label="登入的使用者"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={() => signInOrSignOut()}
            >
              {!session && <LoginIcon />}
              {session && <LogoutIcon />}
            </IconButton>
          </>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
