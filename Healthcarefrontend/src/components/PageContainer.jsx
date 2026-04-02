import { Container, Box, Typography, alpha, IconButton, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function PageContainer({ children, title, subtitle, showBack = true }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      position: 'relative',
      width: '100%', 
      minHeight: '100vh', 
      bgcolor: 'transparent', 
      overflow: 'hidden',
      py: 4
    }}>
      {/* Background Blobs (Minimalist version for content pages) */}
      <Box className="glass-blob" sx={{ top: '-10%', right: '-5%', width: '30vw', height: '40vw', background: 'rgba(99, 102, 241, 0.1)', animationDelay: '-5s' }} />
      <Box className="glass-blob" sx={{ bottom: '10%', left: '-5%', width: '25vw', height: '35vw', background: 'rgba(168, 85, 247, 0.1)', animationDelay: '-10s' }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 5, gap: 2 }}>
            {showBack && (
              <Tooltip title="Back to Dashboard">
                <IconButton 
                  onClick={() => navigate("/dashboard")}
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.8)', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    color: '#6366f1',
                    p: 1.5,
                    '&:hover': { bgcolor: '#fff', transform: 'scale(1.1)', color: '#4f46e5' }
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
            )}
            <Box>
              {title && <Typography variant="h2" sx={{ fontWeight: 900, mb: 1, letterSpacing: '-1.5px' }} className="text-gradient">{title}</Typography>}
              {subtitle && <Typography variant="subtitle1" sx={{ color: '#64748b', fontWeight: 600 }}>{subtitle}</Typography>}
            </Box>
          </Box>

          <Box className="glass-card" sx={{ p: { xs: 3, md: 6 }, bgcolor: 'rgba(255,255,255,0.8)' }}>
            {children}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default PageContainer;