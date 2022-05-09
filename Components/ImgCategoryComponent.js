import React, { useState, useEffect, useContext, useRef } from 'react';
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
import { ConfigContext } from '../comm/ConfigContext'
import Loading from '../comm/LoadingComponents'

function PhotoDir(props) {
    return <TouchableHighlight onPress={() => props.onClick(props.tagid)}>
        <View>
            <Image source={require('../asset/dir.png')} style={styles.Img}></Image>
            <Text style={styles.Txt}>{props.tagname}</Text>
        </View>
    </TouchableHighlight>
}

function ImgCategory({ navigation }) {
    const [tags, setTags] = useState([]);
    const [config, setConfig] = useContext(ConfigContext);
    const [isLoading, setIsLoading] = useState(true);
    const [loadSchedul, setLoadSchedul] = useState([]);
    const loadhis = useRef([]);
    useEffect(() => {
        loadhis.current=[...loadhis.current, config.Url + '/photo/getTagsByUserId?userid=' + config.UserId + " starting"];
        setLoadSchedul(loadhis.current);
        function fetchdata() {
            loadhis.current=[...loadhis.current, "fetchdata"];
            setLoadSchedul(loadhis.current)
            return fetch(config.Url + '/photo/getTagsByUserId?userid=' + config.UserId,
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
                    setIsLoading(false);
                    console.log(res);
                    loadhis.current=[...loadhis.current, "res "+JSON.stringify(res)];
                    setLoadSchedul(loadhis.current)
                    console.log(loadhis.current)
                })
                .catch(err =>{loadhis.current=[...loadhis.current, "res catch "+JSON.stringify(err.message),JSON.stringify(err.stack)]; setLoadSchedul(loadhis.current);}
                );
        }
        try {
            fetchdata();
        }
        catch (e) {
            loadhis.current=[...loadhis.current, "catch: " + JSON.stringify(e)];
            setLoadSchedul(loadhis.current)
        }
    }, []);

    function OpenDir(tagid) {
        console.log(navigation);
        navigation.navigate('ImgView', { tagid: tagid })
    }

    // return (<View>
    //     {
    //         loadSchedul.map((item, idx) => {
    //             return <Text key={idx}>{item}</Text>
    //         })
    //     }

    // </View>);
    return (isLoading ? (<Loading />)
        // (<View>
        //      {
        //             loadSchedul.map((item, idx) => {
        //                 return <Text key={idx}>{item}</Text>
        //             })
        //         }

        // </View>) 
        : 
        (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.Container}>
                <PhotoDir tagid="_all" tagname="全部" onClick={tagid => OpenDir("_all")}></PhotoDir>
                {
                    tags.map((item, idx) => {
                        return <PhotoDir key={idx} tagid={item} tagname={item} onClick={tagid => OpenDir(item)}></PhotoDir>
                    })
                }
            </View>
        </SafeAreaView>));
}

const styles = StyleSheet.create({
    Container: {
        marginTop: 8,
        backgroundColor: "aliceblue",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    Img: {
        width: 50,
        height: 50,
    },
    Txt: {
        width: 50,
    }
});

export default ImgCategory;
