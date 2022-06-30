import React,{useContext} from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview'
import {ConfigContext} from '../comm/ConfigContext';

function Browser() {
  const [config, setConfig] = useContext(ConfigContext);
  const url = 'http://192.168.31.248:50010/imgbrower';
  return (
    <View>
      <WebView source={{uri: url}} style={{width: '100%', height: '100%'}} />
    </View>
  );
}

export default Browser;
