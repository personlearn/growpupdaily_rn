import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet, FlatList, View, Pressable, Image, Button,
    Dimensions, ToastAndroid, SafeAreaView, Modal, Switch, Alert, Text
} from "react-native";
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { ConfigContext } from '../comm/ConfigContext';

function ImgView({ props, route }) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [config, setConfig] = useContext(ConfigContext);
    console.log(config);
    const [photoArr, setPhotoArr] = useState([]);
    const [attr, setAttr] = useState({ photoid: "", istag: false, visible: false });

    const { tagid } = route.params;
    useEffect(() => {
        if (tagid === "_all") {
            async function getPhoto() {
                await fetch(config.Url + '/photo/getAllPhoto?userid=' + config.UserId,
                    {
                        method: "GET",
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        },
                        cache: 'default'
                    }).then(res => res.json())
                    .then(res => {
                        setPhotoArr(res.data);
                        console.log(res);
                    });
            }
            getPhoto();
        }
        else {
            async function getPhoto() {
                await fetch(config.Url + '/photo/getPhotoByTag',
                    {
                        method: "POST",
                        body: JSON.stringify({
                            userid: config.UserId,
                            tagid: tagid
                        }),
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        },
                        cache: 'default'
                    }).then(res => res.json())
                    .then(res => {
                        setPhotoArr(res.data);
                        console.log(res);
                    });
            }
            getPhoto();
        }
    }, []);

    function onCategory(item) {
        setAttr({ istag: !attr.istag, photoid: item._id, visible: !attr.visible })
        // return ToastAndroid.showWithGravity(
        //     item.photosrc,
        //     ToastAndroid.SHORT,
        //     ToastAndroid.CENTER
        // );
    }

    function renderItem({ item, index }) {
        return (
            <TouchableHighlight onLongPress={() => onCategory(item)}>
                <View>
                    <Text style={{ height: 20 }}>{index + 1}/{photoArr.length}</Text>
                    <Image source={{ uri: item.photosrc }} key={item._id} style={{ height: windowHeight - 50, width: windowWidth,marginLeft:0 }}
                        progressiveRenderingEnabled={true} resizeMode="contain" />
                    {/* <Text style={{ height: 20,width:windowHeight-10 }}>{item.photosrc}</Text> */}
                </View>
            </TouchableHighlight>
        )
    }

    function getItemLayout(data, index) {
        return { index, length: windowWidth, offset: windowWidth * index };
    }

    function maskOnBack(isvis) {
        setAttr({ visible: isvis })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Mask config={config} attr={attr} onBack={(isvis) => maskOnBack(isvis)} />
            <FlatList data={photoArr}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                pagingEnabled={true}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                getItemLayout={(data, index) => getItemLayout(data, index)}
            />
        </SafeAreaView>
    )

    // return <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
    //     {
    //         photoArr.map((item, id) => {
    //             return (
    //                 <Pressable key={id}>
    //                     <Image source={{ uri: item.photosrc }} progressiveRenderingEnabled={true} key={id} style={{ width: 120, height: 120, marginVertical: 5, marginHorizontal: 5 }} />
    //                 </Pressable>
    //             )
    //         })
    //     }
    // </View>

};

const Mask = (props) => {
    const [tags, setTags] = useState([]);
    const [phototags, setPhototags] = useState([]);
    const [tagtxt, setTagtxt] = useState("");
    //const [modalVisible, setModalVisible] = useState(props.attr.visible);

    useEffect(() => {
        console.log(props);
        // console.log(modalVisible);
    });

    const effet = () => {
        console.log("effet")
        console.log(props.config);
        console.log(props.attr.photoid)
        getTagsByUserid();
        getPhotoById();
    };

    async function getTagsByUserid() {
        await fetch(props.config.Url + '/photo/getTagsByUserId?userid=' + props.config.UserId,
            {
                method: "GET",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                cache: 'default'
            }).then(res => res.json())
            .then(res => {
                setTags(res.data.tags);
                console.log(res.data ? res.data.tags : []);
            });
    }

    async function getPhotoById() {
        await fetch(props.config.Url + '/photo/getPhotoById',
            {
                method: "POST",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    userid: props.config.UserId,
                    photoid: props.attr.photoid
                }),
                cache: 'default'
            }).then(res => res.json())
            .then(res => {
                setPhototags(res.data && res.data.tagid ? res.data.tagid : [])
                console.log(res);
            });
    }

    function toggleSwitch(item, isTag) {
        let tmpphototags = [];
        if (isTag) {
            tmpphototags = [...phototags, item];
            setPhototags(tmpphototags);

        }
        else {
            tmpphototags = phototags.filter((obj) => { return obj !== item });
            setPhototags(tmpphototags);
        }
        console.log(item)
        console.log(isTag)
        console.log(props)
        console.log(tmpphototags)
        fetch(props.config.Url + '/photo/addPhotoByTag',
            {
                method: "POST",
                body: JSON.stringify({
                    userid: props.config.UserId,
                    tags: tmpphototags,
                    photoid: props.attr.photoid
                }),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                cache: 'default'
            }).then(res => res.json())
            .then(res => {
                if (res.code === 0) {
                    Alert.alert("打标签成功")
                }
                else {
                    Alert.alert("打标签失败！" + res.message)
                }
                console.log(res);
            });
    }

    function addTag() {
        fetch(props.config.Url + '/photo/addTagsByUserId',
            {
                method: "POST",
                body: "userid=" + props.config.UserId + "&tagname=" + tagtxt,
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                cache: 'default'
            }).then(res => res.json())
            .then(res => {
                if (res.code === 0) {
                    Alert.alert("添加新标签成功");
                    setTags([...tags, tagtxt])
                }
                else {
                    Alert.alert("添加新标签失败！" + res.message)
                }
                console.log(res);
            });
    }

    return <Modal animationType="slide"
        transparent={false}
        visible={props.attr.visible}
        onRequestClose={() => {
            props.onBack(!props.attr.visible)
        }}
        onShow={() => effet()}
    >
        <View style={{ margin: 20 }}>
            <View key={-1} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput placeholder='请输入标签名称' style={{ height: 40, width: 200, borderWidth: 1, borderColor: "black" }}
                    onChangeText={text => setTagtxt(text)} />
                <Button title='提交' onPress={() => addTag()} style={{ height: 40, width: 100 }} />
            </View>
            {
                tags.map((item, index) => {
                    return <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text key={index} style={{ height: 40, width: 100 }}>{item}</Text>
                        <Switch
                            style={{ height: 40, width: 100 }}
                            key={index}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={phototags.includes(item) ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(val) => toggleSwitch(item, val)}
                            value={phototags.includes(item)}
                        />
                    </View>
                })
            }
        </View>
    </Modal>
};

export default ImgView;