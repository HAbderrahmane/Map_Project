import React, { useState } from 'react';
import { Text,View, Dimensions } from 'react-native';
import {WebView} from 'react-native-webview';


const Planning= () => {
  const [isLoading, setIsLoading] = useState(true);

  const webViewRef = React.createRef();

  const handleLoadStart = () => setIsLoading(true);
  const handleLoadEnd = () => setIsLoading(false);

  return (
    <View style={{ flex: 1 }}>
      {isLoading && <Text>Loading...</Text>}
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://www.buildai.space/app/trip-planner-ai' }}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
      />
    </View>
  );
};

export default Planning;