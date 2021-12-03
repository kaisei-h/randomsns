import React, { useState, useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import Button from "@material-ui/core/Button";
import Modal from "react-modal";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { RiMailAddLine } from "react-icons/ri";
import { IoIosSend } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  text: {
    margin: theme.spacing(3),
  },
}));

const RandomDM = () => {
  const classes = useStyles();
  const { sendDMCont, askList } = useContext(ApiContext);
  const [text, setText] = useState("");

  console.log(askList);
  const friendList = askList.filter((friend) => {
    return friend.approved === true;
  });
  console.log(friendList);
  const randomOne = friendList[ Math.floor( Math.random() * friendList.length)];
  console.log(randomOne);


  const sendDM = () => {
    const uploadDM = new FormData();
    uploadDM.append("receiver", randomOne.askFrom);
    uploadDM.append("message", text);
    sendDMCont(uploadDM);
  };

  const handleInputChange = () => (event) => {
    const value = event.target.value;
    setText(value);
  };
  
  return (
    <div class="container">
        <form class="app-form">
            <TextField
            placeholder="かきかき"
            multiline
            rows={6}
            className={classes.text}
            type="text"
            onChange={handleInputChange()}
            />
            <div class="button_center">
                <button type="submit" onClick={() => sendDM()}>叫ぶ</button>
            </div>
        </form>
    </div>
    
  );
};

export default RandomDM;
