/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class CloudOCR extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      imgURI: 'https://www.google.ae/search?q=image+uri&rlz=1C5CHFA_enAE727AE727&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjywe6GhKbUAhVC7RQKHTUHD6oQ_AUIBigB&biw=1332&bih=722#imgrc=5suNxoTltolYYM:'
    }
  }
  onImage= () =>
  {

  }

  showActionSheetMenu() {
    this.ActionSheet.show();
  }
  onActionSheetMenu(index) {
    const options = {
      quality: 1.0,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    switch (index) {
      case 0:
        ImagePicker.launchCamera(options, (response) => {
          this.onImagePicker(response);
        });
        break;
      case 1:
        ImagePicker.launchImageLibrary(options, (response) => {
          this.onImagePicker(response);
        });
        break;
      default:
    }
  }

  onImagePicker(response) {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else if (response.uri !== undefined) {
      let source = '';
      if (Platform.OS === 'android') {
        source = { uri: response.uri };
      } else {
        source = { uri: response.uri.replace('file://', ''), isStatic: true };
      }
      ImageResizer.createResizedImage(source.uri, 400, 300, 'JPEG', 80)
        .then((resizedImageUri) => {
          this.setState({imgURI: resizedImageUri});
        }).catch((err) => {
          console.log(err);
        }).catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
       <View style={{flex:1}}>
        <TouchableOpacity onPress={this.onImage}>
          <Image
            style={{flex:1}}
            source={this.state.imgURI} />
        </TouchableOpacity>
       </View>
       <View style={{flex:1}}>

       </View>
       <ActionSheet
            ref={(as) => { this.ActionSheet = as; }}
            options={Constants.IP_BUTTONS}
            cancelButtonIndex={Constants.IP_BUTTONS.length - 1}
            onPress={this.onActionSheetMenu.bind(this)}
            tintColor={Colors.textPrimary} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('CloudOCR', () => CloudOCR);
