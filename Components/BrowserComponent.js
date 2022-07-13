import React,{useContext} from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview'
import {ConfigContext} from '../comm/ConfigContext';

function Browser() {
  const [config, setConfig] = useContext(ConfigContext);
  const url = 'http://192.168.31.248:50010/imgbrower';
  //获取设备的宽度和高度
  const {
  height: deviceHeight,
  width: deviceWidth
  } = Dimensions.get('window');
  return (
    <View style={{flex: 1,paddingTop:20}}>
      <WebView source={{uri: url,method: 'GET'}} style={{width:deviceWidth, height:deviceHeight}} />
    </View>
  );
}

export default Browser;
