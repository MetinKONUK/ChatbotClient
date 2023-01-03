import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import {
  Grid,
  TextField,
  Typography,
  Box,
  Backdrop,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { grey, blue, pink, lime } from "@mui/material/colors";
import Axios from "axios";
import Navbar from "./navbar";
function Dashboard() {
  const actions = [
    { icon: <AttachMoneyIcon />, name: "Varlıklarım" },
    { icon: <CreditCardIcon />, name: "Kredi Kartlarım" },
    { icon: <AddShoppingCartIcon />, name: "Harcamalarım" },
  ];
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen(!open);

  const currentUser = useSelector((state) => state.user);
  const { email } = currentUser.userData !== null && currentUser.userData;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  const condition = message === "";
  useEffect(() => {
    Axios.get(`http://localhost:5000/read-conversation/${email}`).then(
      (response) => {
        const { conversation } = response.data[0];
        let aux = [];
        conversation.map((conv) => {
          aux = aux.concat([
            { self: true, text: conv.question },
            { self: false, text: conv.answer },
          ]);
        });
        setMessages(aux);
      }
    );
  }, [condition, email]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { text: message, userId: 100 };
    Axios.post("http://localhost:5000/chat", data).then((response) => {
      console.log(response.data);
      const data = {
        email: email,
        question: message,
        answer: response.data.response,
      };
      Axios.post("http://localhost:5000/insert-conversation", data);
      setMessages(
        messages.concat([
          { self: true, text: message },
          { self: false, text: response.data.response },
        ])
      );
      setMessage("");
      console.log(messages);
    });
  };
  const displayMessages = () => {
    return messages.map((message) => {
      const { text, self } = message;
      if (self) {
        return (
          <Typography
            key={uuidv4()}
            sx={{
              display: "block",
              marginLeft: "auto",
              mr: 4,
              mt: 4,
              mb: 4,
              width: "50% !important",
              backgroundColor: blue[300],
              color: "white",
              padding: "2vh",
            }}
          >
            {text}
          </Typography>
        );
      } else {
        return (
          <Typography
            key={uuidv4()}
            sx={{
              display: "block",
              marginRight: "auto",
              ml: 4,
              mt: 4,
              mb: 4,
              width: "50% !important",
              backgroundColor: lime[500],
              color: "white",
              padding: "2vh",
            }}
          >
            {text}
          </Typography>
        );
      }
    });
  };
  return (
    <>
      <Navbar />
      <Grid container justifyContent="center">
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            maxHeight: "70vh",
            overflow: "auto",
            height: "70vh",
            backgroundColor: grey[200],
            m: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid container>{displayMessages()}</Grid>
          <Box sx={{ height: 330, transform: "translateZ(0px)", flexGrow: 1 }}>
            <Backdrop open={open} />
            <SpeedDial
              ariaLabel="SpeedDial tooltip example"
              sx={{ position: "absolute", bottom: 16, right: 16 }}
              icon={<SpeedDialIcon />}
              onClose={handleToggle}
              onOpen={handleToggle}
              open={open}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  tooltipOpen
                  onClick={handleToggle}
                />
              ))}
            </SpeedDial>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{
                display: "block",
                width: "100% !important",
                marginLeft: "auto !important",
                marginRight: "auto !important",
                mb: 4,
              }}
              name="message"
              fullWidth
              size="medium"
              margin="normal"
              autoFocus
              value={message}
              onChange={handleChange}
            />
          </form>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
