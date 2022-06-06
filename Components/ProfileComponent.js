import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Button} from 'react-native';

function Profile() {
  const [nums, setNums] = useState([1, 2, 3, 4, 5, 6, 7]);

  function gengeBall() {
    let tmparr = [];
    let i = 0;
    while (i < 6) {
      let num = Math.round(Math.random() * 32 + 1);
      if (!tmparr.includes(num)) {
        tmparr[i] = num;
        i++;
      }
    }

    tmparr.sort(function (a, b) {
      return a - b;
    });
    tmparr[6] = Math.round(Math.random() * 15 + 1);
    console.log(tmparr);
    setNums(tmparr);
  }

  return (
    <View>
      <View>
        <Ball color="#FA8072" val={nums[0]} />
        <Ball color="#FA8072" val={nums[1]} />
        <Ball color="#FA8072" val={nums[2]} />
        <Ball color="#FA8072" val={nums[3]} />
        <Ball color="#FA8072" val={nums[4]} />
        <Ball color="#FA8072" val={nums[5]} />
        <Ball color="#00BFFF" val={nums[6]} />
      </View>
      <Button onClick={() => gengeBall()}>生成</Button>
    </View>
  );
}

function Ball(props) {
  return (
    <View
      className="redball"
      style={{
        width: '50px',
        height: '50px',
        borderRadius: '100%',
        backgroundColor: props.color,
        textAlign: 'center',
        lineHeight: '50px',
        display: 'inline-block',
      }}>
      <Text>{props.val}</Text>
    </View>
  );
}

export default Profile;
