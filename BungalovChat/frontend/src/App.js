import React, { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Box,
  Typography,
  TextField,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Divider,
  IconButton
} from "@mui/material";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import BungalowIcon from '@mui/icons-material/Bungalow';


const drawerWidth = 300;
const collapsedDrawerWidth = 80;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8ab4f8',
      light: '#aecbfa',
      dark: '#5f8dd3'
    },
    background: {
      default: '#111112', // Daha koyu siyah
      paper: '#18181a'    
    },
    text: {
      primary: '#e8eaed',
      secondary: '#9aa0a6'
    },
    divider: 'rgba(255, 255, 255, 0.1)'
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h3: {
      fontWeight: 500,
      color: '#e8eaed',
      fontSize: '1.75rem',
      lineHeight: 1.3
    },
    subtitle1: {
      color: '#9aa0a6',
      fontSize: '1rem',
      lineHeight: 1.5
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '20px',
          padding: '8px 24px',
          fontWeight: 500,
          '&:hover': {
            backgroundColor: 'rgba(138, 180, 248, 0.08)'
          }
        },
        contained: {
          backgroundColor: '#8ab4f8',
          color: '#202124',
          '&:hover': {
            backgroundColor: '#aecbfa',
            boxShadow: '0 1px 3px 0 rgba(0,0,0,0.3)'
          },
          '&.Mui-disabled': {
            backgroundColor: 'rgba(138, 180, 248, 0.3)',
            color: 'rgba(255, 255, 255, 0.3)'
          }
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.12)',
          color: '#8ab4f8',
          '&:hover': {
            borderColor: '#8ab4f8',
            backgroundColor: 'rgba(138, 180, 248, 0.04)'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '24px',
            backgroundColor: '#1a1a1d', // Changed background color to match main background
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.15)'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: '1px'
            }
          },
          '& .MuiInputBase-input': {
            color: '#e8eaed',
            '&::placeholder': {
              color: 'rgba(255, 255, 255, 0.5)',
              opacity: 1
            }
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'transparent',
          boxShadow: 'none'
        }
      }
    }
  }
});

function App() {
  const [question, setQuestion] = useState("");
  const [sampleQuestions, setSampleQuestions] = useState([]);
  const [messages, setMessages] = useState([]); // {role: 'user'|'bot', text: string}
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false); // New state for hover
  const chatEndRef = useRef(null);

  const API_URL = "https://problem-outdoors-standings-zero.trycloudflare.com";

  useEffect(() => {
    fetch(`${API_URL}/sample-questions`)
      .then((res) => res.json())
      .then((data) => setSampleQuestions(data.samples || []));
  }, [API_URL]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSampleClick = (sample) => {
    setQuestion(sample);
    handleSend(sample);
  };

  const handleSend = async (q = null) => {
    const ask = q !== null ? q : question;
    if (!ask.trim()) return;

    setError("");
    setLoading(true); // Girişi ve gönder butonunu devre dışı bırak
    setMessages((prevMsgs) => [...prevMsgs, { role: "user", text: ask }]);
    setQuestion("");

    const botTypingMessageId = `bot-typing-${Date.now()}`;
    // Başlangıçta tek nokta ile yazıyor mesajı ekle
    setMessages((prevMsgs) => [...prevMsgs, { role: "bot", text: "...", id: botTypingMessageId, isTyping: true }]);

    let typingInterval;
    const dots = ["...", "...", "..."];
    let dotIndex = 0;

    // Yazma animasyonunu başlat
    typingInterval = setInterval(() => {
      dotIndex++;
      setMessages(prevMsgs =>
        prevMsgs.map(msg =>
          msg.id === botTypingMessageId ? { ...msg, text: dots[dotIndex % 3] } : msg
        )
      );
    }, 100); // Animasyon hızı (her 100ms'de bir güncelle)

    try {
      const response = await fetch(`${API_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: ask }),
      });

      clearInterval(typingInterval); // API yanıtı alındığında veya işlenmeye başlandığında animasyonu durdur
      setMessages(prevMsgs => prevMsgs.filter(msg => msg.id !== botTypingMessageId)); // Yazıyor mesajını kaldır

      if (!response.ok) {
        const errData = await response.json().catch(() => ({ detail: "Sunucudan hatalı yanıt." }));
        throw new Error(errData.detail || "Bir hata oluştu.");
      }

      const data = await response.json();

      // Gerçek bot yanıtını göstermeden önce gecikme ekle
      setTimeout(() => {
        const botResponseText = data.response || data.answer || data.message || "";
        setMessages((prevMsgs) => [...prevMsgs, { role: "bot", text: botResponseText }]);
        setLoading(false); // Bot yanıtı gösterildikten sonra girişi etkinleştir
      }, 100); // Yanıt gösterme gecikmesi (0.1 saniye)

    } catch (err) {
      // Bu catch bloğu fetch ağ hatalarını veya try bloğundan atılan hataları yakalar
      if (typingInterval) clearInterval(typingInterval); // Hata durumunda interval'ı temizle
      setMessages(prevMsgs => prevMsgs.filter(msg => msg.id !== botTypingMessageId)); // Yazıyor mesajını temizle
      setError(err.message || "Mesaj gönderilemedi.");
      setLoading(false); // Hata durumunda girişi etkinleştir
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh", background: "#1a1a1d" }}>
        {/* Sol Menü */}
        <Box
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{
            position: 'fixed', // Make the menu fixed
            top: 0,
            bottom: 0,
            width: isHovered ? drawerWidth : collapsedDrawerWidth, // Dynamic width based on hover
            // flexShrink: 0, // Removed flexShrink for fixed position
            bgcolor: '#1e1e1e',
            // borderRight: '1px solid rgba(255, 255, 255, 0.1)', // Removed border
            display: 'flex',
            flexDirection: 'column',
            // height: '100vh', // Not needed with top/bottom 0 and fixed position
            overflowY: 'auto', // Allow scrolling within the fixed menu if content exceeds height
            transition: 'width 0.3s ease' // Smooth transition
          }}
        >
          <Box sx={{
            backgroundColor: '#1e1e1e',
            position: 'sticky',
            top: 0,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: `${collapsedDrawerWidth}px`, // Make this area height of collapsed drawer
            width: '100%'
          }}>
            <QuestionAnswerIcon
              sx={{
                fontSize: '32px', // Adjust icon size as needed
                color: 'text.secondary', // Or 'primary.main' for more emphasis
                opacity: isHovered ? 0 : 1,
                transition: 'opacity 0.3s ease-in-out',
              }}
            />
          </Box>
          <Box sx={{
            p: 2,
            overflowY: isHovered ? 'auto' : 'hidden', // Make overflowY conditional
            overflowX: 'hidden', // Hide horizontal scroll always
            flex: 1,
            '&::-webkit-scrollbar': {
              width: '6px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '3px'
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent'
            }
          }}>
            <BungalowIcon
              sx={{
                fontSize: '48px', // İkon boyutu
                color: 'text.secondary',
                opacity: isHovered ? 1 : 0, // Fare üzerindeyken görünür yap
                visibility: isHovered ? 'visible' : 'hidden', // Fare üzerinde değilken yer kaplamasın
                transition: 'opacity 0.3s ease, visibility 0.3s ease', // Yumuşak geçiş
                mb: 10, // İkon ile yazı arasında boşluk
                display: 'block', // margin:auto için block olması gerekir
                mx: 'auto' // İkonu yatayda ortala
              }}
            />
            <Typography variant="subtitle2" color="text.secondary" sx={{
              mb: 1.5,
              px: 1,
              fontSize: '0.85rem',
              opacity: isHovered ? 1 : 0, // Hide text when not hovered
              transition: 'opacity 0.3s ease' // Smooth transition
            }}>
              Sık Sorulan Sorular
            </Typography>
            <List dense disablePadding>
              {sampleQuestions.map((q, i) => (
                <ListItem key={i} disablePadding>
                  <ListItemButton 
                    onClick={() => handleSampleClick(q)}
                    sx={{
                      borderRadius: '12px',
                      mb: 0.5,
                      px: 2,
                      py: 1,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)'
                      }
                    }}
                  >
                    <ListItemText 
                      primary={
                        <Typography color="text.primary" fontSize="0.9rem" sx={{
                          lineHeight: 1.4,
                          opacity: isHovered ? 1 : 0, // Hide text when not hovered
                          transition: 'opacity 0.3s ease' // Smooth transition
                        }}>
                          {q}
                        </Typography>
                      } 
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>

        {/* Chat Alanı */}
        <Box sx={{ 
          flex: 1, 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          // justifyContent: "center", // Can remove this if content is taller than viewport
          minHeight: "100vh",
          p: 4,
          backgroundColor: '#1a1a1d',
          marginLeft: `${collapsedDrawerWidth}px` // Add margin to make space for the fixed menu
        }}>
          <Box sx={{ 
            width: '100%',
            maxWidth: '900px',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            mx: 'auto',
            px: 3,
            position: 'relative'
          }}>
            <Box sx={{
              maxWidth: '768px',
              mx: 'auto',
              width: '100%',
              textAlign: 'center',
              py: 6,
              px: 2
            }}>
              <Typography variant="h3" sx={{ 
                mb: 2,
                background: 'linear-gradient(90deg, #8ab4f8, #c58af9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>
                Asteria Bungalov Sohbet Asistanına Hoş Geldiniz
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" sx={{ 
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: '1.1rem'
              }}>
                Sorunuzu yazın veya sol menüden seçin.
              </Typography>
            </Box>
            <Divider />
            <Box sx={{
              flex: 1,
              overflowY: 'auto',
              py: 2,
              px: 1,
              backgroundColor: '#1a1a1d', 
              display: "flex", 
              flexDirection: "column", 
              gap: 2
            }}>
              {messages.map((msg, idx) => (
                <Box 
                  key={idx} 
                  sx={{
                    alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                    maxWidth: "80%",
                    // Add flex container for bot messages to include avatar
                    display: msg.role === 'bot' ? 'flex' : 'block', // Use flex for bot messages
                    alignItems: 'flex-start', // Align items to the top
                    gap: 1 // Space between avatar and message bubble
                  }}
                >
                  {/* Bot avatar */}
                  {msg.role === 'bot' && (
                    <Avatar 
                      src="/2.png" 
                      alt="Bot Avatar"
                      sx={{  
                        width: 36, 
                        height: 36, 
                        mr: 0.5, 
                        mt: 0.5 
                      }}
                    />
                  )}
                  <Box
                    sx={{
                      p: 2,
                      px: 3,
                      borderRadius: 4,
                      background: msg.role === "user" ? '#2c2f33' : 'rgba(255, 255, 255, 0.05)', // User message background changed to a compatible gray
                      color: msg.role === "user" ? '#e8eaed' : '#e8eaed',
                      mb: 1,
                      fontSize: '15px',
                      lineHeight: 1.6,
                      border: msg.role === "user" ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(255, 255, 255, 0.08)' // User message border changed to a compatible gray
                    }}
                  >
                    {msg.text}
                  </Box>
                      {msg.role === "bot" && msg.matched && (
                        <Typography 
                          variant="caption" 
                          color="text.secondary" 
                          sx={{ 
                            display: 'block',
                            mt: 1.5,
                            fontSize: '0.75rem',
                            opacity: 0.8,
                            '& b': {
                              color: 'text.secondary',
                          fontWeight: 500
                        }
                      }}
                    >
                      <b>En yakın soru:</b> {msg.matched} ({msg.similarity.toFixed(2)})
                    </Typography>
                  )}

                  {/* Typing indicator style */}
                  {msg.type === 'typing' && (
                     <Typography 
                        variant="caption" 
                        color="text.secondary" 
                        sx={{
                           fontStyle: 'italic',
                           opacity: 0.7 
                        }}
                      >
                         {msg.text}
                     </Typography>
                  )}
                </Box>
              )
            )}
              <div ref={chatEndRef} />
            </Box>
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mx: 'auto',
                    mb: 2,
                    maxWidth: '85%',
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    color: '#f44336',
                    '& .MuiAlert-icon': {
                      color: '#f44336'
                    }
                  }}
                >
                  {error}
                </Alert>
              )}
            <Box sx={{
              position: 'sticky',
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              backgroundColor: 'rgba(26, 26, 29, 0.9)',
              backdropFilter: 'blur(8px)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              zIndex: 10
            }}>
              <Box sx={{ 
                // maxWidth: '2500px', // Removed maxWidth to allow wider input
                mx: 'auto',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Mesajınızı yazın..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    disabled={loading}
                    autoFocus
                    multiline // Enable multiline input
                    rows={1} // Set initial number of rows
                     onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault(); // Prevent newline
                        handleSend(); // Send message
                      }
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        pr: 1,
                        '&.Mui-focused fieldset': {
                          borderWidth: '1px'
                        }
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          type="submit"
                          disabled={loading || !question.trim()}
                          disableRipple // Added to remove ripple effect
                          sx={{
                            color: loading || !question.trim() ? 'rgba(255, 255, 255, 0.3)' : 'primary.main',
                            '&:hover': {
                              backgroundColor: 'transparent',
                            },
                            '&.Mui-disabled': {
                              color: 'rgba(255, 255, 255, 0.12)'
                            },
                            // Remove blue on focus, active, and focusVisible
                            '&:focus': {
                              outline: 'none',
                              boxShadow: 'none',
                            },
                            '&:active': {
                              backgroundColor: 'transparent',
                              boxShadow: 'none',
                            },
                            '&.Mui-focusVisible': {
                               outline: 'none',
                               backgroundColor: 'transparent',
                               boxShadow: 'none',
                            }
                          }}
                        >
                          {loading ? (
                            <CircularProgress size={24} color="inherit" />
                          ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3.4 20.4L20.85 12.92C21.66 12.57 21.66 11.43 20.85 11.08L3.4 3.6C3.02 3.44 2.59 3.52 2.29 3.8C2 4.08 1.91 4.51 2.03 4.9L4.03 11.25C4.1 11.49 4.3 11.67 4.55 11.71L13.5 13.25C13.64 13.27 13.75 13.36 13.79 13.5C13.83 13.64 13.8 13.79 13.71 13.9C13.61 14.01 13.47 14.07 13.33 14.07C13.3 14.07 13.26 14.07 13.23 14.06L4.25 12.5L2.05 19.1C1.92 19.5 2.02 19.92 2.31 20.2C2.6 20.48 3.02 20.54 3.4 20.4Z" fill="currentColor"/>
                            </svg>
                          )}
                        </IconButton>
                      ),
                      sx: {
                        pr: 0.5,
                        '&.Mui-focused fieldset': {
                          borderColor: 'primary.main',
                          borderWidth: '1px'
                        }
                      }
                    }}
                  />
                </Box>
              </Box>
              <Typography variant="caption" color="text.secondary" align="center" display="block" sx={{ mt: 1, fontSize: '0.7rem', opacity: 0.7 }}>
                Bungalov Bilgi Asistanı, size yardımcı olmaktan mutluluk duyar.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;

