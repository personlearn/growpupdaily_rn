import React from 'react';
import {View,WebView} from 'react-native';

function Browser() {
    return <View>
        <WebView source={{uri:''}} style={{width:'100%',height:'100%'}} />
    </View>
}

export default Browser;