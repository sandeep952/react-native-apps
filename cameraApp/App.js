import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
const LoadingScreen = () => {
  return (
    <View style={styles.loadingScreen}>
      <Text style={{fontSize: 26, color: 'red'}}>Loading....</Text>
    </View>
  );
};

const App = () => {
  const [image, setImage] = useState();
  const [isLoading, setLoader] = useState(false);
  const [frontCamera, toggleCameraMode] = useState(true);
  const takePicture = async (camera) => {
    setLoader(true);
    try {
      const options = {quality: 0.9, base64: false};
      const data = await camera.takePictureAsync(options);
      setImage(data.uri);
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };

  function toggleCamera() {
    toggleCameraMode(!frontCamera);
  }

  return (
    <View style={styles.container}>
      {image ? (
        <View style={styles.preview}>
          <Text style={styles.camText}>Here is your image</Text>
          <Image
            style={styles.capturedImage}
            source={{uri: image, width: '100%', height: '80%'}}
          />
          <Button title="Click another Image" onPress={() => setImage(null)} />
        </View>
      ) : (
        <RNCamera
          style={styles.cameraScreen}
          type={
            frontCamera
              ? RNCamera.Constants.Type.front
              : RNCamera.Constants.Type.back
          }
          captureAudio={false}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'This app needs camera permission to click photos',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio',
            message: 'This app needs audio permission ',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }}>
          {({camera, status}) => {
            console.log(status);
            if (status !== 'READY' || isLoading) return <LoadingScreen />;

            return (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.buttons}
                  onPress={() => takePicture(camera)}>
                  <Text>Capture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons} onPress={toggleCamera}>
                  <Text>Toggle Camera</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c69d8',
  },
  loadingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttons: {
    backgroundColor: '#FFF',
    padding: 20,
    margin: 20,
  },
  camText: {
    backgroundColor: '#74B9FF',
    color: 'black',
    marginVertical: 20,
    width: '100%',
    textAlign: 'center',
    padding: 10,
  },
  capturedImage: {
    width: 400,
    height: 400,
    borderRadius: 200,
  },
  cameraScreen: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
  },
});

export default App;
