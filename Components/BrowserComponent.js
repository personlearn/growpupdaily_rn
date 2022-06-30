import React from 'react';
import {View, WebView} from 'react-native';
import {ConfigContext} from '../comm/ConfigContext';

function Browser() {
  const [config, setConfig] = useContext(ConfigContext);
  const url = config.Url + '/imgbrower';
  return (
    <View>
      <WebView source={{uri: url}} style={{width: '100%', height: '100%'}} />
    </View>
  );
}

export default Browser;
