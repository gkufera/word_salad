import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { WebView } from "react-native-webview";
import * as Speech from "expo-speech";
import Constants from "expo-constants";

export default function App() {
  const potato1 = `potato potatopotato potato potato potatopotatopotato potatopotatopotatopotato potatopotatopotato potatopotato potato potato potatopotato potatopotato potato potato potatopotato potato potato potato potatopotatopotatopotato potato potato potato potato potato potatopotatopotatopotato potato potato potato potato potatopotato potato potato potatopotato potato potatopotatopotatopotato potato potatopotato potatopotatopotato potatopotatopotatopotato potatopotatopotato potato potato potato potatopotato potatopotato potatopotato potatopotato potato potato potato potatopotato potatopotato potatopotato potatopotato potatopotato potato potato potato potatopotato potato potato potato potatopotatopotato potato potato potatopotatopotato potato potato potatopotato potato potatopotatopotatopotato potatopotatopotato potatopotato potatopotato`;

  const potato2 = `potatopotato potatopotatopotato potatopotatopotato potatopotatopotatopotatopotato potatopotato potato potato potato potato potato potato potatopotatopotato potatopotatopotatopotato potato potato potatopotatopotato potato potatopotato potatopotato potato potatopotato potato potato potatopotato potatopotato potato potato potatopotatopotato potatopotatopotatopotato potato potato potato potatopotatopotato potato potatopotatopotatopotatopotatopotato potatopotato potato potato potato potato potato potato potato potato potato potato potato potato potatopotatopotato potato potato potatopotato potatopotato potato potato potato potatopotato potato potato potatopotatopotatopotato potatopotato potatopotatopotato potatopotatopotato potato potato potato potatopotatopotatopotatopotato potato potato potato potatopotato potato potatopotato`;

  const potato3 = `potato potato potato potato potatopotatopotatopotatopotato potato potato potato potatopotatopotatopotatopotato potato potatopotatopotato potato potato potatopotatopotato potatopotatopotato potatopotatopotato potatopotato potato potatopotatopotato potatopotatopotatopotatopotatopotatopotato potatopotatopotatopotatopotatopotatopotatopotatopotatopotato potato potato potato potato potato potatopotatopotatopotato potato potatopotato potato potato potato potato potatopotatopotato potato potato potatopotatopotatopotatopotatopotato potato potato potato potatopotato potato potatopotato potato potato potatopotato potatopotato potatopotato potatopotatopotato potato potato potatopotato potato potatopotato potatopotato potatopotato potato potatopotato potato potato potato potato potato potatopotato potatopotato potato potato potatopotatopotato potato potato`;

  const theCode = `
  document.getElementById('enable_voice_output').addEventListener('click', primeSpeak);
  var speechPrimed = false;
  function primeSpeak(){
    //if(speechPrimed === false){
      var u = new SpeechSynthesisUtterance("${potato1}");
      u.voice = speechSynthesis.getVoices()[1]
      speechSynthesis.speak(u);
      speechPrimed = true;
      document.getElementById("voices").innerHTML = speechSynthesis.getVoices().map((voice, i) => {
        return voice.name + ' ' + i;
      });
    //}
  }
  setTimeout(function(){ document.getElementById("enable_voice_output").click(); }, Math.random() * 2000 + 1000);
  true; // note: this is required, or you'll sometimes get silent failures
`;

  // apparently Safari needs input in order to use text to speech.
  // search for alex and find him if you can.... maybe prompt users to download him if you can't?

  const styles = StyleSheet.create({
    container: {
      //flex: 1,
      //justifyContent: "center",
      paddingTop: Constants.statusBarHeight,
      backgroundColor: "#ecf0f1",
      padding: 8,
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  });

  return (
    <View style={styles.container}>
      <WebView
        style={{
          top: 100,
          height: 500,
          left: 0,
          right: 0,
          position: "absolute",
        }}
        source={{
          html: `<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><center><button id="enable_voice_output" style="font-size: 32px;">Potato</button><p id="voices"></p>`,
        }}
        injectedJavaScript={theCode}
        onMessage={(event) => {}}
        ignoreSilentHardwareSwitch={true}
        scrollEnabled={false}
        scalesPageToFit={Platform.OS === "android"}
        bounces={false}
      />
      <WebView
        style={{
          top: 0,
          height: 500,
          left: 0,
          right: 0,
          position: "absolute",
        }}
        source={{
          html: `<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><center><button id="enable_voice_output" style="font-size: 32px;">Potato</button><p id="voices"></p>`,
        }}
        injectedJavaScript={theCode}
        onMessage={(event) => {}}
        ignoreSilentHardwareSwitch={true}
        scrollEnabled={false}
        scalesPageToFit={Platform.OS === "android"}
        bounces={false}
      />
      <Button
        style={{ height: 600, top: 600 }}
        title="Potato"
        onPress={() => {
          Speech.speak(potato2);
        }}
      />
      <View style={{ height: 300 }} />
    </View>
  );
}
