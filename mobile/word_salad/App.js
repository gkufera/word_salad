import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-community/picker";

export default function App() {
  // The only way we can make multiple simultaneous text to speeches on iOS is via multiple webviews.
  // ...and Safari needs input in order to use text to speech.
  // So this is an annoyingly complicated project.

  const [currentTextValue, setCurrentTextValue] = React.useState("");
  const [currentWebRef, setCurrentWebRef] = React.useState(0);
  const [activeSalads, setActiveSalads] = React.useState({});
  const webRefs = [];
  const NUM_WEB_REFS = 10;
  const NUM_WORD_SALAD_WORDS = 100;
  const CHANCE_OF_SPACE = 50;
  const MESSAGE_TYPES = {
    START_SALAD: "STARTSALAD",
    END_SALAD: "ENDSALAD",
    VOICES: "VOICES",
  };
  for (var i = 0; i < NUM_WEB_REFS; i++) {
    webRefs[i] = useRef(null);
  }
  const [voiceOptions, setVoiceOptions] = React.useState([
    { label: "loading...", name: 0 },
  ]);
  const [currentVoiceName, setCurrentVoiceName] = React.useState("");
  const placeholder = "type";
  const initialInjectedJavaScript = (i) => `
  document.onclick = function() {
    window.ReactNativeWebView.postMessage(JSON.stringify({ message: "${
      MESSAGE_TYPES.START_SALAD
    }" }))
  }
  ${
    i == 0
      ? `
  window.ReactNativeWebView.postMessage(JSON.stringify({ 
    message: "${MESSAGE_TYPES.VOICES}", 
    voices: speechSynthesis.getVoices().map((voice, i) => {
      return {
        default: voice.default,
        lang: voice.lang,
        localService: voice.localService,
        name: voice.name,
        index: i,
      };
    })
  }))
  `
      : ``
  }
  document.body.style.backgroundColor = 'black'
  true; // note: this is required, or you'll sometimes get silent failures
`;

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
      height: plusDimension,
      width: plusDimension,
    },
    visiblePlusWebView: {
      height: plusDimension,
      width: plusDimension,
      position: "absolute",
      top: 0,
      bottom: 0,
    },
    invisiblePlusWebView: {},
  });

  const buildSalad = (words) => {
    var string = "";
    for (var i = 0; i < NUM_WORD_SALAD_WORDS; i++) {
      let randomChance = Math.random() * 100;
      if (
        randomChance < CHANCE_OF_SPACE ||
        string === "" ||
        string[string.length - 1] === " "
      ) {
        string += words[Math.floor(Math.random() * words.length)];
      } else {
        string += " ";
      }
    }
    return string;
  };

  const startSalad = (i) => {
    if (currentTextValue.trim() === "" || i in activeSalads) return;

    const wordsUnsplit = currentTextValue;
    setCurrentTextValue("");
    const salad = buildSalad(wordsUnsplit.split(" "));

    activeSalads[i] = wordsUnsplit;
    setActiveSalads(activeSalads);

    webRefs[i].current.injectJavaScript(`
      var u = new SpeechSynthesisUtterance("${salad}");
      var voices = speechSynthesis.getVoices().filter((voice) => {
        return voice.name == "${currentVoiceName}";
      });
      if (voices.length == 0) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ message: "${MESSAGE_TYPES.END_SALAD}" }));
      } else {
        u.voice = voices[0];
        u.addEventListener("end", function(event) { 
          window.ReactNativeWebView.postMessage(JSON.stringify({ message: "${MESSAGE_TYPES.END_SALAD}" }));
        });
        speechSynthesis.speak(u);
      }
    `);

    console.log(JSON.stringify(activeSalads));

    if (Object.keys(activeSalads).length == NUM_WEB_REFS) {
      setCurrentWebRef(-1);
    } else {
      nextFreeWebRef = (i + 1) % NUM_WEB_REFS;
      while (nextFreeWebRef in activeSalads) {
        nextFreeWebRef = (nextFreeWebRef + 1) % NUM_WEB_REFS;
      }
      setCurrentWebRef(nextFreeWebRef);
    }
    // store ref and wordsUnsplit in dictionary of ongoing voices (polling if stopped)
  };

  const endSalad = (i) => {
    delete activeSalads[i];
    setActiveSalads(activeSalads);
    console.log("yoip");
    console.log(JSON.stringify(activeSalads));
    console.log("yoip");
  };

  const handleVoices = (voices) => {
    console.log(JSON.stringify(voices));
    setVoiceOptions(
      voices.map((voice) => {
        return {
          label: voice.name,
          name: voice.name,
        };
      })
    );
    setCurrentVoiceName(voiceOptions[0].index);
  };

  const handleMessage = (i, event) => {
    console.log(event.nativeEvent.data);
    const data = JSON.parse(event.nativeEvent.data);
    switch (data.message) {
      case MESSAGE_TYPES.START_SALAD:
        startSalad(i);
        break;
      case MESSAGE_TYPES.END_SALAD:
        endSalad(i);
        break;
      case MESSAGE_TYPES.VOICES:
        handleVoices(data.voices);
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBarContainer}>
        <View style={styles.barSpacer} />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setCurrentTextValue(text)}
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
                hidden={currentWebRef != i}
                source={{
                  html: `<body />`,
                }}
                injectedJavaScript={initialInjectedJavaScript(i)}
                onMessage={(event) => handleMessage(i, event)}
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
      <View>
        <Picker
          selectedValue={currentVoiceName}
          style={{ height: 200, top: plusDimension, left: 0, right: 0 }}
          onValueChange={(itemValue, itemIndex) =>
            setCurrentVoiceName(itemValue)
          }
        >
          {voiceOptions.map((voice, i) => {
            return (
              <Picker.Item label={voice.label} value={voice.name} key={i} />
            );
          })}
        </Picker>
      </View>
      <View>
        {Object.keys(activeSalads).map((key, index) => {
          return (
            <Text key={index}>
              {key}: {activeSalads[key]}
            </Text>
          );
        })}
        <View style={{ height: 300 }} />
      </View>
      <View style={{ height: 300 }} />
    </SafeAreaView>
  );
}
