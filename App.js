/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { createContext, useState, useEffect } from 'react';
import type { Node } from 'react';
//import android.os.Bundle;
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import Home from './Components/HomeComponent';
import Photo from './Components/PhotoComponent';
import Profile from './Components/ProfileComponent';
import ImgCategory from './Components/ImgCategoryComponent';
import ImgView from './Components/ImgViewComponent';
import Download from './Components/DownloadComponent';
import Browser from './Components/BrowserComponent';
import { ConfigProvider } from './comm/ConfigContext';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

function PhotoDetail() {
  return (
    <Stack.Navigator initialRouteName='ImgCategory' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='ImgCategory' component={ImgCategory}></Stack.Screen>
      <Stack.Screen name='ImgView' component={ImgView}></Stack.Screen>
      <Stack.Screen name='Profile' component={Profile}></Stack.Screen>
    </Stack.Navigator>
  )
}

function App() {
  return (
    <ConfigProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" backBehavior='none' screenOptions={{ headerShown: false }}>
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{ drawerLabel: 'Home' }}
          />
          <Drawer.Screen
            name="PhotoDetail"
            component={PhotoDetail}
            options={{ drawerLabel: 'PhotoDetail' }}
          />
          <Drawer.Screen
            name="Profile"
            component={Profile}
            options={{ drawerLabel: 'Profile' }}
          />
           <Drawer.Screen
            name="Download"
            component={Download}
            options={{ drawerLabel: 'Download' }}
          />
           <Drawer.Screen
            name="Browser"
            component={Browser}
            options={{ drawerLabel: 'Browser' }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </ConfigProvider>
  );
}


// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
