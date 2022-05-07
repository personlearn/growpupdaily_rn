import React, { useState,useEffect } from 'react';
import type { Node } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    TouchableHighlight,
    Alert,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function PhotoDir(props) {

    return <TouchableHighlight onPress={() => props.onClick(props.tagid)}>
        <View>
            <Image source={require('../asset/dir.png')}></Image>
            <Text>{props.tagname}</Text>
        </View>
    </TouchableHighlight>
}

function ImgCategory() {
    const [tags, setTags] = useState([]);
    useEffect(()=>{
        async function fetchdata(){
        await fetch('http://192.168.31.248:50011/photo/getTagsByUserId?userid=44275978c89511ec89b5685d43b14891',
            {
                method: "GET",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                cache: 'default'
            }).then(res => res.json())
            .then(res => {
                setTags(res.data ? res.data.tags : [])
                console.log(res);
                //Alert.alert(res)
            });
        }
        fetchdata();
    },[]);

    function OpenDir(tagid) {
        //const{history} =this.props
        //console.log(history);
        //history.push("/menu1/"+tagid)
        Alert.alert(tagid)
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <PhotoDir tagid="_all" tagname="全部" onClick={tagid => OpenDir("_all")}></PhotoDir>
                {
                    tags.map((item, idx) => {
                        return <PhotoDir key={idx} tagid={item} tagname={item} onClick={tagid => OpenDir(item)}></PhotoDir>
                    })
                }
            </ScrollView>
        </SafeAreaView>
    );
}

export default ImgCategory;
