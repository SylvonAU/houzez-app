import * as React from "react";
import type { NextPage } from "next";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const EmailVerificationPage: NextPage = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            width: "550px",
            height: "580px",
            boxShadow: 3,
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
          bgcolor="primary"
        >
          <Box
            component="img"
            sx={{
              height: 100,
              width: 100,
              marginTop: 8
            }}
            alt="Email Open."
            src="/images/email.png"
          />
          <Typography variant="h6" color="primary" mt="10px">
            Confirm Your Email
          </Typography>
          <Typography variant="body2" mt="16px" textAlign="center" ml="80px" mr="80px">
            Your account has been successfully registered. To complete the process please check your email for a
            validation request.
          </Typography>
          <Box mt="20px">
            <Button variant="contained">CONTINUE</Button>
          </Box>
          <Box mt="20px">
            <Button variant="contained">Resend verification email</Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default EmailVerificationPage;
