import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  // The only way we can make multiple simultaneous text to speeches on iOS is via multiple webviews.
  // ...and Safari needs input in order to use text to speech.
  // So this is an annoyingly complicated project.

  const [currentTextValue, onChangeText] = React.useState("");
  const [currentWebRef, setCurrentWebRef] = React.useState(0);
  const webRefs = [];
  const NUM_WEB_REFS = 10;
  for (var i = 0; i < NUM_WEB_REFS; i++) {
    webRefs[i] = useRef(null);
  }
  const placeholder = "type";
  const theCode = `
  document.onclick = function() {
    window.ReactNativeWebView.postMessage("")
  }
  document.body.style.backgroundColor = 'black'
  true; // note: this is required, or you'll sometimes get silent failures
`; // TODO: pass back the list of voices

  // search for alex and find him if you can.... maybe prompt users to download him if you can't?

  const plusDimension = 50;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      backgroundColor: "#FFFFFF",
    },
    topBarContainer: {
      flex: 1,
      justifyContent: "space-between",
      flexDirection: "row",
      height: plusDimension,
    },
    textInput: {
      flex: 1,
      minWidth: plusDimension * 3,
      height: plusDimension,
      borderColor: "#000000",
      borderWidth: 1,
      paddingLeft: 20,
      paddingRight: 20,
    },
    barSpacer: {
      width: 20,
    },
    plusContainer: {
      //height: plusDimension,
      width: plusDimension,
    },
    visiblePlusWebView: {
      height: plusDimension,
      width: plusDimension,
      position: "absolute",
      top: 0,
      bottom: 0,
    },
    invisiblePlusWebView: {
      height: 0,
      width: 0,
      position: "absolute",
      top: plusDimension,
      bottom: 0,
    },
  });

  const startSalad = (i) => {
    // get ref from event.nativeEvent.data
    // inject this JS
    webRefs[i].current.injectJavaScript(`
    var u = new SpeechSynthesisUtterance("${currentTextValue}");
    u.voice = speechSynthesis.getVoices()[1]
    speechSynthesis.speak(u);
    `);
    // store ref and currentTextValue in dictionary of ongoing voices (polling if stopped)
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBarContainer}>
        <View style={styles.barSpacer} />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => onChangeText(text)}
          value={currentTextValue}
          autoCorrect={false}
          autoFocus={true}
          autoCapitalize={"none"}
          placeholder={placeholder}
          returnKeyType={"none"}
        />
        <View style={styles.barSpacer} />
        <View style={styles.plusContainer}>
          {webRefs.map((webRef, i) => {
            return (
              <WebView
                ref={webRefs[i]}
                key={i}
                style={
                  currentWebRef == i
                    ? styles.visiblePlusWebView
                    : styles.invisiblePlusWebView
                }
                source={{
                  html: `<body />`,
                }}
                injectedJavaScript={theCode}
                onMessage={(event) => startSalad(i)}
                ignoreSilentHardwareSwitch={true}
                scrollEnabled={false}
                scalesPageToFit={Platform.OS === "android"}
                bounces={false}
              />
            );
          })}
        </View>
        <View style={styles.barSpacer} />
      </View>
      <View style={{ height: 300 }} />
    </SafeAreaView>
  );
}
