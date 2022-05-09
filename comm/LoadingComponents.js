import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default Loading=()=>{
    return <ActivityIndicator style={{flex: 1,justifyContent: "center"}} size="large" />
}