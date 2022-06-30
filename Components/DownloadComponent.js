import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';

function Download() {
  const [url, setUrl] = useState();

  function commit() {
    fetch(config.Url + '/spider/addurl?url' + url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      cache: 'default',
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      });
  }

  return (
    <View>
      <Text>url:</Text>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={text => setUrl(text)}
        value={url}
      />
      <Button onClick={() => commit()}>提交</Button>
    </View>
  );
}
export default Download;
