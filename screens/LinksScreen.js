import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import { GiftedChat } from "react-native-gifted-chat";
import axios from "axios";
export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "Links"
  };
  state = {
    messages: []
  };

  componentDidMount() {
    axios.get("http://localhost:5001/historyMessages").then(response => {
      console.log("response.data.list", response.data.list);
      this.setState({
        messages: response.data.list
      });
    });

    this.ws = new WebSocket("ws://192.168.86.28:5001");

    this.ws.onmessage = e => {
      const message = JSON.parse(e.data);

      this.setState({
        messages: GiftedChat.append(this.state.messages, message)
      });
    };
  }

  onSend(messages = []) {
    this.ws.send(
      JSON.stringify({
        text: messages[0].text,
        _id: "5c0a54c0295c351171deae9e", // audrey DESTINATAIRE(LIBRE)
        user: {
          _id: "5c0a54c7295c351171deae9f" // alexis EXPEDITEUR
        }
      })
    ); // Ici j'envoie aussi le sender_id et le receiver_id
    this.setState(
      previousState => ({
        messages: GiftedChat.append(previousState.messages, messages)
      }),
      () => console.log(this.state)
    );
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        isLoadingEarlier={true}
        user={{
          _id: "5c0a54c7295c351171deae9f",
          name: "Alexis"
        }}
      />
    );
  }
}
