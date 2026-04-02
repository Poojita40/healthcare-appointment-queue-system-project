import { Container, Paper } from "@mui/material";

function PageContainer({ children }) {
  return (
    <Container
      maxWidth={false}
      sx={{
        mt: 5,
        px: { xs: 2, md: 6 }
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3
        }}
      >
        {children}
      </Paper>
    </Container>
  );
}

export default PageContainer;