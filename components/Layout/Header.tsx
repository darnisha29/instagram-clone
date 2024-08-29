import React from "react";
import Link from "next/link";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useSession } from "next-auth/react";

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <Box
      className="p-4 w-full flex flex-row items-center"
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: "20%",
        alignItems: "center",
        height: "20",
        pt: "10px",
        boxShadow: "1px 5px 5px #e0dcdc",
        zIndex:'999999'
      }}
    >
      <img alt="logo" src="/logos.png" width={150} />
      <Box sx={{ display: "flex", gap: "20px" }}>
        {session ? (
          <>
            <Typography component="span" sx={{ textDecoration: "none" }}>
              <Link href="/profile">Profile</Link>
            </Typography>
            <Typography>
              <Link href="/createPost">Create Post</Link>
            </Typography>
            <Typography>
              <Link href="/api/auth/signout">Logout</Link>
            </Typography>
          </>
        ) : (
          <>
            <Typography component="span" sx={{ textDecoration: "none" }}>
              <Link href="/auth/SignUp">SignUp</Link>
            </Typography>
            <Typography>
              <Link href="/auth/login">SignIn</Link>
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Header;
