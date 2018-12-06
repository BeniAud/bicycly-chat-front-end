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
    this.ws = new WebSocket("ws://gifted-chat-websocket.herokuapp.com");

    this.ws.onmessage = e => {
      const message = JSON.parse(e.data);

      this.setState({
        messages: GiftedChat.append(this.state.messages, message)
      });
    };
  }

  onSend(messages = []) {
    this.ws.send(JSON.stringify({ text: messages[0].text, name: "audrey" }));
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
          _id: 1,
          name: "audrey"
        }}
      />
    );
  }
}
