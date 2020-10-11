import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-community/picker";
import { Audio } from "expo-av";

export default function App() {
  // The only way we can make multiple simultaneous text to speeches on iOS is via multiple webviews.
  // ...and Safari needs input in order to use text to speech.
  // So this is an annoyingly complicated project.

  const NUM_WEB_REFS = 10;
  const NUM_WORD_SALAD_WORDS = 100;
  const CHANCE_OF_SPACE = 50;
  const MESSAGE_TYPES = {
    START_SALAD: "STARTSALAD",
    END_SALAD: "ENDSALAD",
    VOICES: "VOICES",
  };
  const PLACEHOLDER = "type";
  const PLUS_DIMENSION = 50;

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
      height: PLUS_DIMENSION,
      paddingBottom: 50,
    },
    textInput: {
      flex: 1,
      minWidth: PLUS_DIMENSION * 3,
      height: PLUS_DIMENSION,
      borderColor: "#000000",
      borderWidth: 1,
      paddingLeft: 20,
      paddingRight: 20,
    },
    barSpacer: {
      width: 20,
    },
    plusContainer: {
      height: PLUS_DIMENSION,
      width: PLUS_DIMENSION,
    },
    visiblePlusWebView: {
      height: PLUS_DIMENSION,
      width: PLUS_DIMENSION,
      position: "absolute",
      top: 0,
      bottom: 0,
    },
    invisiblePlusWebView: {},
    picker: {
      height: 200,
      left: 0,
      right: 0,
    },
    salads: {
      flex: 1,
      minHeight: 500,
      justifyContent: "center",
    },
    button: {
      height: 20,
    },
  });

  const [currentTextValue, setCurrentTextValue] = React.useState("");
  const [voiceOptions, setVoiceOptions] = React.useState([
    { label: "loading...", index: 0 },
  ]);
  const [currentVoiceIndex, setCurrentVoiceIndex] = React.useState(0);
  const [activeSalads, setActiveSalads] = React.useState(
    Array(NUM_WEB_REFS).fill("")
  );

  const webRefs = [];
  for (var i = 0; i < NUM_WEB_REFS; i++) {
    webRefs[i] = useRef(null);
  }
  const [currentWebRef, setCurrentWebRef] = React.useState(0);

  // JS injected to each webview. On click, we make a salad.
  const initialInjectedJavaScript = (i) => `
    document.onclick = function() {
      window.ReactNativeWebView.postMessage(JSON.stringify({ message: "${
        MESSAGE_TYPES.START_SALAD
      }" }))
    }
    ${
      // On loading the first webview we collect voices
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

  const handleVoices = (voices) => {
    console.log(JSON.stringify(voices));
    setVoiceOptions(
      voices.map((voice) => {
        return {
          label: `${voice.name} (${voice.lang})`,
          index: voice.index,
        };
      })
    );
    const alex = voices.find((voice) => voice.name.includes("Alex"));
    setCurrentVoiceIndex(alex ? alex.index : voiceOptions[0].index);
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: false,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
  };

  const buildSalad = (words) => {
    var string = "";
    for (var i = 0; i < NUM_WORD_SALAD_WORDS; i++) {
      let randomChance = Math.random() * 100;
      if (
        randomChance < CHANCE_OF_SPACE ||
        string.length == 0 ||
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
    if (currentTextValue.trim() === "" || activeSalads[i].length > 0) return;

    const wordsUnsplit = currentTextValue;
    const salad = buildSalad(wordsUnsplit.split(" "));

    webRefs[i].current.injectJavaScript(`
      var u = new SpeechSynthesisUtterance("${salad}");
      u.voice = speechSynthesis.getVoices()[${currentVoiceIndex}];
      u.addEventListener("end", function(event) { 
        window.ReactNativeWebView.postMessage(JSON.stringify({ message: "${MESSAGE_TYPES.END_SALAD}" }))
      });
      speechSynthesis.speak(u);
    `);

    activeSalads[i] = `${
      voiceOptions.find((voice) => voice.index == currentVoiceIndex).label
    }: ${wordsUnsplit}`;
    setActiveSalads(activeSalads);

    console.log(JSON.stringify(activeSalads));

    if (activeSalads.filter((salad) => salad.length > 0) == NUM_WEB_REFS) {
      setCurrentWebRef(-1);
    } else {
      nextFreeWebRef = (i + 1) % NUM_WEB_REFS;
      while (activeSalads[nextFreeWebRef].length > 0) {
        nextFreeWebRef = (nextFreeWebRef + 1) % NUM_WEB_REFS;
      }
      setCurrentWebRef(nextFreeWebRef);
    }
    // store ref and wordsUnsplit in dictionary of ongoing voices (polling if stopped)
  };

  const endSalad = (i) => {
    activeSalads[i] = "";
    setActiveSalads(activeSalads);
    console.log("yoip");
    console.log(JSON.stringify(activeSalads));
    console.log("yoip");
    setCurrentWebRef(i);
  };

  const stopSalad = (i) => {
    console.log(`stopping ${i}`);
    webRefs[i].current.injectJavaScript(`
      speechSynthesis.cancel();
    `);
    endSalad(i);
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

  const silence = () => {
    console.log(`SILENCE`);
    webRefs.map((webRef) => {
      webRef.current.injectJavaScript(`
        speechSynthesis.cancel();
      `);
    });
    setActiveSalads(Array(NUM_WEB_REFS).fill(""));
    setCurrentWebRef(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Picker
        style={styles.picker}
        selectedValue={currentVoiceIndex}
        onValueChange={(itemValue, itemIndex) =>
          setCurrentVoiceIndex(itemValue)
        }
      >
        {voiceOptions.map((voice, i) => {
          return (
            <Picker.Item
              label={voice.label}
              value={voice.index}
              key={`picker item ${i}`}
            />
          );
        })}
      </Picker>
      <View style={styles.topBarContainer}>
        <View style={styles.barSpacer} />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setCurrentTextValue(text)}
          value={currentTextValue}
          autoCorrect={false}
          autoFocus={true}
          autoCapitalize={"none"}
          placeholder={PLACEHOLDER}
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
      <Button
        style={styles.button}
        onPress={silence}
        title="SILENCE"
        color="#FF0000"
      />
      <View style={styles.salads}>
        {activeSalads
          .map((salad, index) => {
            return { salad: salad, index: index };
          })
          .filter((saladAndIndex) => saladAndIndex.salad.length > 0)
          .map((saladAndIndex) => {
            return (
              <Button
                style={styles.button}
                key={`button ${saladAndIndex.index}`}
                onPress={() => stopSalad(saladAndIndex.index)}
                title={saladAndIndex.salad}
                color="#000000"
              />
            );
          })}
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
