import { useState } from "react";
import { useRouter } from "next/router";
import { Button, TextField, Typography, Container } from "@mui/material";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const  SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (response.ok) {
        router.push("/auth/login");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{display:'flex', flexDirection:'column', height:'100vh' , justifyContent:"center",alignItems:'center', }}>
      <img
      src="/logos.png"
      width={150}
      />
      <Typography sx={{fontSize:'26px', letterSpacing:'1px', lineHeight:'26px', textAlign:"center", padding:'20px 0px'}}>SignUp to see photos and videos <br/>  from  your friends</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          type="text"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
      </form>
      <Typography variant="body2" style={{ marginTop: "16px" }}>
        Already have an account? <a href="/auth/login">Login here</a>
      </Typography>
    </Container>
  );
};

export default SignUpPage;
