import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import { GiftedChat } from "react-native-gifted-chat";
export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "Links"
  };
  state = {
    messages: []
  };

  componentDidMount() {
    this.ws = new WebSocket("ws://192.168.86.28:5001");

    this.ws.onmessage = e => {
      const message = JSON.parse(e.data);

      this.setState(
        {
          messages: GiftedChat.append(this.state.messages, message)
        },
        () => console.log(this.state)
      );
    };
  }

  onSend(messages = []) {
    this.ws.send(
      JSON.stringify({
        text: messages[0].text,
        _id: "5c095ed554f4241f70ad49a7", //audrey
        user: { _id: "5c095ed054f4241f70ad49a6" } //alexis
      })
    ); //ici j envoie le sender-id ET le receiver_id
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        isLoadingEarlier={true}
        user={{
          _id: "5c095ed554f4241f70ad49a7",
          name: "audrey"
        }}
      />
    );
  }
}
