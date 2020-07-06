import React, { useEffect } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import history from "../../history";

const theme = {
  background: "#fff",
  fontFamily: "Arial, Helvetica, sans-serif",
  headerBgColor: "#00677D",
  headerFontColor: "#fff",
  headerFontSize: "20px",
  botBubbleColor: "#00B2B2",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4c4c4c",
};
var lipstick = {};
var powder = {};
var item = {};
function CustomChatbot(props) {
  // const [data, setData] = useState(props.data);
  const config = {
    width: "300px",
    height: "400px",
    floating: true,
  };
  useEffect(() => {
    if (props.data && props.data.length) {
      let d = props.data;
      let pencils = d.filter((item) => item.category === "pencil");
      let finalItem = pencils[Math.floor(Math.random() * pencils.length - 1)];
      item = finalItem;
    }
  }, [props.data]);

  useEffect(() => {
    if (props.data && props.data.length) {
      let d = props.data;
      let pencils = d.filter((item) => item.category === "powder");
      let finalItem = pencils[Math.floor(Math.random() * pencils.length - 1)];
      powder = finalItem;
    }
  }, [props.data]);

  useEffect(() => {
    if (props.data && props.data.length) {
      let d = props.data;
      let pencils = d.filter((item) => item.category === "lipstick");
      let finalItem = pencils[Math.floor(Math.random() * pencils.length - 1)];
      lipstick = finalItem;
    }
  }, [props.data]);

  function redirectToProduct() {
    console.log("Final Item: ", item);
    history.push(`/product/${item.id}`);
  }

  const steps = [
    {
      id: "1",
      message: "Hello, Welcome to Naturl! Please tell me your name!",
      trigger: "6",
    },
    {
      id: "6",
      user: true,
      trigger: "2",
    },
    {
      id: "2",
      message: "Hi {previousValue}, Glad to know you !!",
      trigger: "3",
    },
    {
      id: "3",
      message: "What type of product are you looking for?",
      trigger: "4",
    },
    {
      id: "4",
      options: [
        {
          value: "Pencil",
          label: "A Pencil",
          trigger: () => redirectToProduct(),
        },
        {
          value: "Lipstick",
          label: "A Lipstick",
          trigger: "5",
        },
        {
          value: "Powder",
          label: "A Powder",
          trigger: "5",
        },
      ],
    },
    {
      id: "5",
      message: "Have a great day !!",
      end: true,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <ChatBot steps={steps} {...config} />
    </ThemeProvider>
  );
}
export default CustomChatbot;