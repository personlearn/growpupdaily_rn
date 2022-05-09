import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, TouchableHighlight, View } from "react-native";

const Dimensions = require('Dimensions');
const { width, height, scale } = Dimensions.get('window');

export default Mask = props => {
    const [isMask, setIsMask] = useState(props.mask);
    return <View style={[{ display: isMask }, styles.Mask]} onClick={(isMask)=>setIsMask(isMask)}>
        {props.children}
    </View>

};

const styles = StyleSheet.create({
    Mask: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor:'rgba(0, 0, 0, 0.4)'
    }
})
