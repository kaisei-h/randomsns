import React, { useState, useContext } from "react";
import { ApiContext } from "../context/ApiContext";
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

const InboxDM = ({ dm, prof }) => {
  const classes = useStyles();
  Modal.setAppElement("#root");
  const { sendDMCont } = useContext(ApiContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [text, setText] = useState("");

  const handleInputChange = () => (event) => {
    const value = event.target.value;
    setText(value);
  };

  const sendDM = () => {
    const uploadDM = new FormData();
    uploadDM.append("receiver", dm.sender);
    uploadDM.append("message", text);
    sendDMCont(uploadDM);
    setModalIsOpen(false);
  };

  const customStyles = {
    content: {
      top: "20%",
      left: "auto",
      right: "10%",
      bottom: "auto",
    },
  };

  return (
    <li className="list-item">
      {prof[0] && <h4>{dm.message}</h4>}
      {prof[0] && (
        <h4>
          {prof[0].nickName}
          <button className="mail" onClick={() => setModalIsOpen(true)}>
          <RiMailAddLine />
          </button>

          <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={customStyles}
          >
          <Typography>Message</Typography>
          <TextField
          className={classes.text}
          type="text"
          onChange={handleInputChange()}
          />
          <br />
          <button className="btn-modal" onClick={() => sendDM()}>
            <IoIosSend />
          </button>
          <button className="btn-modal" onClick={() => setModalIsOpen(false)}>
            <IoMdClose />
          </button>
          </Modal>


        </h4>
      )}
    </li>
  );
};

export default InboxDM;
