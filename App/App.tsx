/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react';
import {StatusBar, Text} from 'react-native';
import {WebView} from 'react-native-webview';

const App = () =>
    <>
        <StatusBar barStyle="dark-content" backgroundColor="purple"/>
        <Text>zsszz</Text>
        <WebView source={{uri: 'http://192.168.1.4:7000'}}
                 scalesPageToFit
                 javaScriptEnabled
                 domStorageEnabled
                 startInLoadingState
                 mixedContentMode="always"
                 style={{flex: 1}}/>
    </>;

export default App;
