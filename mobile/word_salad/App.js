import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-community/picker";
import { Audio } from "expo-av";

const GET_FLAG = (countryCode) => {
  if (countryCode == "AD") return "🇦🇩";
  if (countryCode == "AE") return "🇦🇪";
  if (countryCode == "AF") return "🇦🇫";
  if (countryCode == "AG") return "🇦🇬";
  if (countryCode == "AI") return "🇦🇮";
  if (countryCode == "AL") return "🇦🇱";
  if (countryCode == "AM") return "🇦🇲";
  if (countryCode == "AO") return "🇦🇴";
  if (countryCode == "AQ") return "🇦🇶";
  if (countryCode == "AR") return "🇦🇷";
  if (countryCode == "AS") return "🇦🇸";
  if (countryCode == "AT") return "🇦🇹";
  if (countryCode == "AU") return "🇦🇺";
  if (countryCode == "AW") return "🇦🇼";
  if (countryCode == "AX") return "🇦🇽";
  if (countryCode == "AZ") return "🇦🇿";
  if (countryCode == "BA") return "🇧🇦";
  if (countryCode == "BB") return "🇧🇧";
  if (countryCode == "BD") return "🇧🇩";
  if (countryCode == "BE") return "🇧🇪";
  if (countryCode == "BF") return "🇧🇫";
  if (countryCode == "BG") return "🇧🇬";
  if (countryCode == "BH") return "🇧🇭";
  if (countryCode == "BI") return "🇧🇮";
  if (countryCode == "BJ") return "🇧🇯";
  if (countryCode == "BL") return "🇧🇱";
  if (countryCode == "BM") return "🇧🇲";
  if (countryCode == "BN") return "🇧🇳";
  if (countryCode == "BO") return "🇧🇴";
  if (countryCode == "BQ") return "🇧🇶";
  if (countryCode == "BR") return "🇧🇷";
  if (countryCode == "BS") return "🇧🇸";
  if (countryCode == "BT") return "🇧🇹";
  if (countryCode == "BV") return "🇧🇻";
  if (countryCode == "BW") return "🇧🇼";
  if (countryCode == "BY") return "🇧🇾";
  if (countryCode == "BZ") return "🇧🇿";
  if (countryCode == "CA") return "🇨🇦";
  if (countryCode == "CC") return "🇨🇨";
  if (countryCode == "CD") return "🇨🇩";
  if (countryCode == "CF") return "🇨🇫";
  if (countryCode == "CG") return "🇨🇬";
  if (countryCode == "CH") return "🇨🇭";
  if (countryCode == "CI") return "🇨🇮";
  if (countryCode == "CK") return "🇨🇰";
  if (countryCode == "CL") return "🇨🇱";
  if (countryCode == "CM") return "🇨🇲";
  if (countryCode == "CN") return "🇨🇳";
  if (countryCode == "CO") return "🇨🇴";
  if (countryCode == "CR") return "🇨🇷";
  if (countryCode == "CU") return "🇨🇺";
  if (countryCode == "CV") return "🇨🇻";
  if (countryCode == "CW") return "🇨🇼";
  if (countryCode == "CX") return "🇨🇽";
  if (countryCode == "CY") return "🇨🇾";
  if (countryCode == "CZ") return "🇨🇿";
  if (countryCode == "DE") return "🇩🇪";
  if (countryCode == "DJ") return "🇩🇯";
  if (countryCode == "DK") return "🇩🇰";
  if (countryCode == "DM") return "🇩🇲";
  if (countryCode == "DO") return "🇩🇴";
  if (countryCode == "DZ") return "🇩🇿";
  if (countryCode == "EC") return "🇪🇨";
  if (countryCode == "EE") return "🇪🇪";
  if (countryCode == "EG") return "🇪🇬";
  if (countryCode == "EH") return "🇪🇭";
  if (countryCode == "ER") return "🇪🇷";
  if (countryCode == "ES") return "🇪🇸";
  if (countryCode == "ET") return "🇪🇹";
  if (countryCode == "FI") return "🇫🇮";
  if (countryCode == "FJ") return "🇫🇯";
  if (countryCode == "FK") return "🇫🇰";
  if (countryCode == "FM") return "🇫🇲";
  if (countryCode == "FO") return "🇫🇴";
  if (countryCode == "FR") return "🇫🇷";
  if (countryCode == "GA") return "🇬🇦";
  if (countryCode == "GB") return "🇬🇧";
  if (countryCode == "GD") return "🇬🇩";
  if (countryCode == "GE") return "🇬🇪";
  if (countryCode == "GF") return "🇬🇫";
  if (countryCode == "GG") return "🇬🇬";
  if (countryCode == "GH") return "🇬🇭";
  if (countryCode == "GI") return "🇬🇮";
  if (countryCode == "GL") return "🇬🇱";
  if (countryCode == "GM") return "🇬🇲";
  if (countryCode == "GN") return "🇬🇳";
  if (countryCode == "GP") return "🇬🇵";
  if (countryCode == "GQ") return "🇬🇶";
  if (countryCode == "GR") return "🇬🇷";
  if (countryCode == "GS") return "🇬🇸";
  if (countryCode == "GT") return "🇬🇹";
  if (countryCode == "GU") return "🇬🇺";
  if (countryCode == "GW") return "🇬🇼";
  if (countryCode == "GY") return "🇬🇾";
  if (countryCode == "HK") return "🇭🇰";
  if (countryCode == "HM") return "🇭🇲";
  if (countryCode == "HN") return "🇭🇳";
  if (countryCode == "HR") return "🇭🇷";
  if (countryCode == "HT") return "🇭🇹";
  if (countryCode == "HU") return "🇭🇺";
  if (countryCode == "ID") return "🇮🇩";
  if (countryCode == "IE") return "🇮🇪";
  if (countryCode == "IL") return "🇮🇱";
  if (countryCode == "IM") return "🇮🇲";
  if (countryCode == "IN") return "🇮🇳";
  if (countryCode == "IO") return "🇮🇴";
  if (countryCode == "IQ") return "🇮🇶";
  if (countryCode == "IR") return "🇮🇷";
  if (countryCode == "IS") return "🇮🇸";
  if (countryCode == "IT") return "🇮🇹";
  if (countryCode == "JE") return "🇯🇪";
  if (countryCode == "JM") return "🇯🇲";
  if (countryCode == "JO") return "🇯🇴";
  if (countryCode == "JP") return "🇯🇵";
  if (countryCode == "KE") return "🇰🇪";
  if (countryCode == "KG") return "🇰🇬";
  if (countryCode == "KH") return "🇰🇭";
  if (countryCode == "KI") return "🇰🇮";
  if (countryCode == "KM") return "🇰🇲";
  if (countryCode == "KN") return "🇰🇳";
  if (countryCode == "KP") return "🇰🇵";
  if (countryCode == "KR") return "🇰🇷";
  if (countryCode == "KW") return "🇰🇼";
  if (countryCode == "KY") return "🇰🇾";
  if (countryCode == "KZ") return "🇰🇿";
  if (countryCode == "LA") return "🇱🇦";
  if (countryCode == "LB") return "🇱🇧";
  if (countryCode == "LC") return "🇱🇨";
  if (countryCode == "LI") return "🇱🇮";
  if (countryCode == "LK") return "🇱🇰";
  if (countryCode == "LR") return "🇱🇷";
  if (countryCode == "LS") return "🇱🇸";
  if (countryCode == "LT") return "🇱🇹";
  if (countryCode == "LU") return "🇱🇺";
  if (countryCode == "LV") return "🇱🇻";
  if (countryCode == "LY") return "🇱🇾";
  if (countryCode == "MA") return "🇲🇦";
  if (countryCode == "MC") return "🇲🇨";
  if (countryCode == "MD") return "🇲🇩";
  if (countryCode == "ME") return "🇲🇪";
  if (countryCode == "MF") return "🇲🇫";
  if (countryCode == "MG") return "🇲🇬";
  if (countryCode == "MH") return "🇲🇭";
  if (countryCode == "MK") return "🇲🇰";
  if (countryCode == "ML") return "🇲🇱";
  if (countryCode == "MM") return "🇲🇲";
  if (countryCode == "MN") return "🇲🇳";
  if (countryCode == "MO") return "🇲🇴";
  if (countryCode == "MP") return "🇲🇵";
  if (countryCode == "MQ") return "🇲🇶";
  if (countryCode == "MR") return "🇲🇷";
  if (countryCode == "MS") return "🇲🇸";
  if (countryCode == "MT") return "🇲🇹";
  if (countryCode == "MU") return "🇲🇺";
  if (countryCode == "MV") return "🇲🇻";
  if (countryCode == "MW") return "🇲🇼";
  if (countryCode == "MX") return "🇲🇽";
  if (countryCode == "MY") return "🇲🇾";
  if (countryCode == "MZ") return "🇲🇿";
  if (countryCode == "NA") return "🇳🇦";
  if (countryCode == "NC") return "🇳🇨";
  if (countryCode == "NE") return "🇳🇪";
  if (countryCode == "NF") return "🇳🇫";
  if (countryCode == "NG") return "🇳🇬";
  if (countryCode == "NI") return "🇳🇮";
  if (countryCode == "NL") return "🇳🇱";
  if (countryCode == "NO") return "🇳🇴";
  if (countryCode == "NP") return "🇳🇵";
  if (countryCode == "NR") return "🇳🇷";
  if (countryCode == "NU") return "🇳🇺";
  if (countryCode == "NZ") return "🇳🇿";
  if (countryCode == "OM") return "🇴🇲";
  if (countryCode == "PA") return "🇵🇦";
  if (countryCode == "PE") return "🇵🇪";
  if (countryCode == "PF") return "🇵🇫";
  if (countryCode == "PG") return "🇵🇬";
  if (countryCode == "PH") return "🇵🇭";
  if (countryCode == "PK") return "🇵🇰";
  if (countryCode == "PL") return "🇵🇱";
  if (countryCode == "PM") return "🇵🇲";
  if (countryCode == "PN") return "🇵🇳";
  if (countryCode == "PR") return "🇵🇷";
  if (countryCode == "PS") return "🇵🇸";
  if (countryCode == "PT") return "🇵🇹";
  if (countryCode == "PW") return "🇵🇼";
  if (countryCode == "PY") return "🇵🇾";
  if (countryCode == "QA") return "🇶🇦";
  if (countryCode == "RE") return "🇷🇪";
  if (countryCode == "RO") return "🇷🇴";
  if (countryCode == "RS") return "🇷🇸";
  if (countryCode == "RU") return "🇷🇺";
  if (countryCode == "RW") return "🇷🇼";
  if (countryCode == "SA") return "🇸🇦";
  if (countryCode == "SB") return "🇸🇧";
  if (countryCode == "SC") return "🇸🇨";
  if (countryCode == "SD") return "🇸🇩";
  if (countryCode == "SE") return "🇸🇪";
  if (countryCode == "SG") return "🇸🇬";
  if (countryCode == "SH") return "🇸🇭";
  if (countryCode == "SI") return "🇸🇮";
  if (countryCode == "SJ") return "🇸🇯";
  if (countryCode == "SK") return "🇸🇰";
  if (countryCode == "SL") return "🇸🇱";
  if (countryCode == "SM") return "🇸🇲";
  if (countryCode == "SN") return "🇸🇳";
  if (countryCode == "SO") return "🇸🇴";
  if (countryCode == "SR") return "🇸🇷";
  if (countryCode == "SS") return "🇸🇸";
  if (countryCode == "ST") return "🇸🇹";
  if (countryCode == "SV") return "🇸🇻";
  if (countryCode == "SX") return "🇸🇽";
  if (countryCode == "SY") return "🇸🇾";
  if (countryCode == "SZ") return "🇸🇿";
  if (countryCode == "TC") return "🇹🇨";
  if (countryCode == "TD") return "🇹🇩";
  if (countryCode == "TF") return "🇹🇫";
  if (countryCode == "TG") return "🇹🇬";
  if (countryCode == "TH") return "🇹🇭";
  if (countryCode == "TJ") return "🇹🇯";
  if (countryCode == "TK") return "🇹🇰";
  if (countryCode == "TL") return "🇹🇱";
  if (countryCode == "TM") return "🇹🇲";
  if (countryCode == "TN") return "🇹🇳";
  if (countryCode == "TO") return "🇹🇴";
  if (countryCode == "TR") return "🇹🇷";
  if (countryCode == "TT") return "🇹🇹";
  if (countryCode == "TV") return "🇹🇻";
  if (countryCode == "TW") return "🇹🇼";
  if (countryCode == "TZ") return "🇹🇿";
  if (countryCode == "UA") return "🇺🇦";
  if (countryCode == "UG") return "🇺🇬";
  if (countryCode == "UM") return "🇺🇲";
  if (countryCode == "US") return "🇺🇸";
  if (countryCode == "UY") return "🇺🇾";
  if (countryCode == "UZ") return "🇺🇿";
  if (countryCode == "VA") return "🇻🇦";
  if (countryCode == "VC") return "🇻🇨";
  if (countryCode == "VE") return "🇻🇪";
  if (countryCode == "VG") return "🇻🇬";
  if (countryCode == "VI") return "🇻🇮";
  if (countryCode == "VN") return "🇻🇳";
  if (countryCode == "VU") return "🇻🇺";
  if (countryCode == "WF") return "🇼🇫";
  if (countryCode == "WS") return "🇼🇸";
  if (countryCode == "XK") return "🇽🇰";
  if (countryCode == "YE") return "🇾🇪";
  if (countryCode == "YT") return "🇾🇹";
  if (countryCode == "ZA") return "🇿🇦";
  if (countryCode == "ZM") return "🇿🇲";
  return "🏳";
};
const NUM_WEB_REFS = 5;
const NUM_WORD_SALAD_WORDS = 500;
const CHANCE_OF_SPACE = 50;
const MESSAGE_TYPES = {
  START_SALAD: "STARTSALAD",
  END_SALAD: "ENDSALAD",
  VOICES: "VOICES",
  WEBVIEW_TOUCHED: "WEBVIEWTOUCHED",
};
const PLACEHOLDER = "type";
const BAR_DIMENSION = 50;
const WEBVIEW_DIMENSION = 50;
const PRESETS = [
  [ 
    {
      lang: 'ar-SA',
      salad: 'orp',
      delay: 0,
    },
  ],
  [ 
    {
      lang: 'ar-SA',
      salad: 'banana',
      delay: 0,
    },
  ],
  [ 
    {
      lang: 'fr-CA',
      salad: 'banana',
      delay: 0,
    },
    {
      lang: 'fr-FR',
      salad: 'banana',
      delay: 200,
    },
  ],
  [ 
    {
      lang: 'ar-SA',
      salad: 'banana',
      delay: 0,
    },
    {
      lang: 'en-IN',
      salad: 'banana',
      delay: 3000,
    },
    {
      lang: 'en-ES',
      salad: 'banana',
      delay: 6000,
    },
    {
      lang: 'en-ES',
      salad: 'banana',
      delay: 10000,
    },
  ],
  [ 
    {
      lang: 'ar-SA',
      salad: 'orp',
      delay: 0,
    },
    {
      lang: 'ar-SA',
      salad: 'tee',
      delay: 1000,
    },
  ],
  [ 
    {
      lang: 'ar-SA',
      salad: 'tee',
      delay: 0,
    },
  ],
  [ 
    {
      lang: 'cs-CZ',
      salad: 'potato',
      delay: 0,
    },
    {
      lang: 'cs-CZ',
      salad: 'potato',
      delay: 500,
    },
    {
      lang: 'en-US',
      salad: 'potato',
      delay: 2000,
    },
  ],
]

export default function App() {
  // The only way we can make multiple simultaneous text to speeches on iOS is via multiple webviews.
  // ...and Safari needs input in order to use text to speech.
  // So this is an annoyingly complicated project.

  // TODO test if we can just have the user touch a bunch of webviews at the beginning

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      backgroundColor: "#FFFFFF",
    },
    title: {
      paddingTop: 10,
      paddingBottom: 10,
      fontSize: 30,
      textAlign: "center",
    },
    barContainer: {
      flex: 1,
      justifyContent: "space-between",
      flexDirection: "row",
      height: BAR_DIMENSION,
      paddingBottom: 75,
    },
    textInput: {
      flex: 1,
      minWidth: BAR_DIMENSION * 3,
      height: BAR_DIMENSION,
      borderColor: "#000000",
      borderWidth: 1,
      paddingLeft: 20,
      paddingRight: 20,
    },
    plus: {
      height: BAR_DIMENSION,
      width: BAR_DIMENSION,
      backgroundColor: "#000000",
    },
    barSpacer: {
      width: 20,
    },
    webViewRowContainer: {
      //flex: 1,
      justifyContent: "space-around",
      flexDirection: "row",
      width: '100%',
      height: WEBVIEW_DIMENSION * 2,
      alignItems: 'center',
    },
    middleViewContainer: {
      flex: 1,
      justifyContent: "space-between",
      backgroundColor: "#FFFFFF",
    },
    webView: {
      height: WEBVIEW_DIMENSION,
      width: WEBVIEW_DIMENSION,
    },
    picker: {
      height: 200,
      left: 0,
      right: 0,
    },
    salads: {
      flex: 1,
      minHeight: 500,
      paddingTop: 30,
    },
    button: {
      height: 20,
      fontSize: 12,
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
  const [activatedWebRefs, setActivatedWebRefs] = React.useState(false);
  const [touchedWebViews, setTouchedWebViews] = React.useState(
    Array(NUM_WEB_REFS).fill(false)
  );

  const webRefs = [];
  for (var i = 0; i < NUM_WEB_REFS; i++) {
    webRefs[i] = useRef(null);
  }
  const [currentWebRef, setCurrentWebRef] = React.useState(0);

  // JS injected to each webview. On click, we make a salad.
  const initialInjectedJavaScript = (i) => `
    document.onclick = function() {
      /*
      window.ReactNativeWebView.postMessage(JSON.stringify({ message: "${
        MESSAGE_TYPES.START_SALAD
      }" }))
      */
     document.body.style.backgroundColor = 'white'
     window.ReactNativeWebView.postMessage(JSON.stringify({ message: "${
       MESSAGE_TYPES.WEBVIEW_TOUCHED
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
      voices
        .filter(
          (voice, index, self) =>
            self.find((otherVoice) => otherVoice.lang === voice.lang).index ===
            voice.index
        )
        .map((voice) => {
          const countryCode = voice.lang.slice(-2);
          const flag = GET_FLAG(countryCode);

          return {
            label: `${voice.lang} ${flag}`,
            index: voice.index,
            flag: flag,
          };
        })
    );
    const alex = voices.find((voice) => voice.name.includes("Alex"));
    const def = voices.filter((voice) => voice.default == true);
    setCurrentVoiceIndex(
      alex ? alex.index : def.length > 0 ? def[0].index : voiceOptions[0].index
    );
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

  const startSaladByWordsAndVoiceIndex = (wordsUnsplit, voiceIndex, i) => {
    if (wordsUnsplit.trim() === "" || activeSalads[i].length > 0) return;

    const salad = buildSalad(wordsUnsplit.split(" "));

    webRefs[i].current.injectJavaScript(`
      function startSalad${i}() {
        var u = new SpeechSynthesisUtterance("${salad}");
        u.voice = speechSynthesis.getVoices()[${voiceIndex}];
        u.addEventListener("end", function(event) { 
          //window.ReactNativeWebView.postMessage(JSON.stringify({ message: "${MESSAGE_TYPES.END_SALAD}" }))
          startSalad${i}()
        });
        speechSynthesis.speak(u);
      }
      startSalad${i}()
      document.body.style.backgroundColor = 'white'
    `);

    activeSalads[i] = `${wordsUnsplit} ${
      voiceOptions.find((voice) => voice.index == voiceIndex).flag
    }`;
    setActiveSalads(activeSalads);

    console.log(JSON.stringify(activeSalads));

    // TODO there is def a problem here on the last one
    if (activeSalads.filter((salad) => salad.length > 0) == NUM_WEB_REFS) {
      setCurrentWebRef(-1);
    } else {
      var nextFreeWebRef = (i + 1) % NUM_WEB_REFS;
      while (activeSalads[nextFreeWebRef].length > 0) {
        nextFreeWebRef = (nextFreeWebRef + 1) % NUM_WEB_REFS;
      }
      setCurrentWebRef(nextFreeWebRef);
    }
  }

  const startSaladByWebView = (i) => startSaladByWordsAndVoiceIndex(currentTextValue, currentVoiceIndex, i)

  const startSalad = () => startSaladByWordsAndVoiceIndex(currentTextValue, currentVoiceIndex, currentWebRef)

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
      document.body.style.backgroundColor = 'black'
    `);
    endSalad(i);
  };

  const handleWebViewTouched = (i) => {
    touchedWebViews[i] = true
    var done = true
    for (const element of touchedWebViews) {
      if (!element) {
        done = false
      }
    }
    setTouchedWebViews(touchedWebViews)
    if (done) {
      setActivatedWebRefs(true)
    }
  }

  const handleMessage = (i, event) => {
    console.log(event.nativeEvent.data);
    const data = JSON.parse(event.nativeEvent.data);
    switch (data.message) {
      case MESSAGE_TYPES.START_SALAD:
        startSalad(i);
        break;
      // THIS DOESN'T HAPPEN AT THE MOMENT
      case MESSAGE_TYPES.END_SALAD:
        endSalad(i);
        break;
      case MESSAGE_TYPES.VOICES:
        handleVoices(data.voices);
        break;
      case MESSAGE_TYPES.WEBVIEW_TOUCHED:
        handleWebViewTouched(i);
        break;
    }
  };

  const silence = () => {
    console.log(`SILENCE`);
    webRefs.map((webRef) => {
      webRef.current.injectJavaScript(`
        speechSynthesis.cancel();
        document.body.style.backgroundColor = 'black'
      `);
    });
    setActiveSalads(Array(NUM_WEB_REFS).fill(""));
    setCurrentWebRef(0);
  };

  /*
  const randomSaladPreset = () => {
    silence()
    const presetSelection = PRESETS[Math.floor(PRESETS.length * Math.random())]
    for (element in presetSelection) {
      if (delay == 0) {
        startSaladByWordsAndVoiceIndex(element.salad, /* TODO GET INDEX FROM element.lang , /* TODO need list of ready synths)
      }
    }
  }
  */

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>WORD SALAD [beta]</Text>
      <View style={styles.webViewRowContainer}>
        {webRefs.map((webRef, i) => {
          return (
            <WebView
              ref={webRefs[i]}
              key={i}
              style={styles.webView}
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
      {!activatedWebRefs ? <View style={styles.middleViewContainer} /> : (
        <View style={styles.middleViewContainer}>
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
          <View style={styles.barContainer}>
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
            <TouchableOpacity style={styles.plus} onPress={() => startSalad()} />
            <View style={styles.barSpacer} />
          </View>
          {/*
          <View style={styles.barContainer}>
            <View style={styles.barSpacer} />
            <Button
              style={styles.button}
              onPress={randomSaladPreset}
              title="🥬🌶🥔"
              color="#FFFFFF"
            />
            <View style={styles.barSpacer} />
          */}
          <Button
            style={styles.button}
            onPress={silence}
            title="SILENCE"
            color="#FF0000"
          />
          {/*
            <View style={styles.barSpacer} />
          </View>
          */}
          <ScrollView style={styles.salads}>
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
          </ScrollView>
        </View>
      )}
      <StatusBar style="auto" />
    </SafeAreaView>/*
  ) : (
    <SafeAreaView style={styles.container}>
      
    </SafeAreaView>*/
  );
}
