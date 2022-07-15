import React, {useState, useContext} from 'react';
import {View, Text, TextInput, Alert,Button} from 'react-native';
import {ConfigContext} from '../comm/ConfigContext';

function Download() {
  const [url, setUrl] = useState();
  const [config, setConfig] = useContext(ConfigContext);
  
  function commit() {
    fetch(config.Url + '/spider/addurl?url=' + url, {
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
        Alert.alert(url + '成功');
      })
      .catch(err=>Alert.alert(JSON.stringify(e)));
  }

  return (
    <View>
      <View>
      <Text>url:</Text>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={text => setUrl(text)}
        value={url}
      />
      <Button title='test' onPress={() => commit()}>提交</Button>
      </View>
      <View>
        <Text>正在访问url:{config.Url + '/spider/addurl?url=' + url}</Text>
      </View>
      <View>

      </View>
    </View>
  );
}
export default Download;
