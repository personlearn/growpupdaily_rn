import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, FlatList, View, Pressable, Image, } from "react-native";
import { ConfigContext } from '../comm/ConfigContext';

function ImgView({ props, route }) {
    console.log("config1");
    const [config, setConfig] = useContext(ConfigContext);
    console.log(config);
    const [photoArr, setPhotoArr] = useState([]);
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

    return <View style={{flexDirection: "row",flexWrap: "wrap"}}>
        {
            photoArr.map((item, id) => {
                return (
                    <Pressable key={id}>
                    <Image source={{ uri: item.photosrc }} progressiveRenderingEnabled={true} key={id} style={{ width: 120, height: 120,marginVertical:5,marginHorizontal:5 }} />
                    </Pressable>
                )
            })
        }
    </View>

};

export default ImgView;