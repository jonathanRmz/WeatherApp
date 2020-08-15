import React from 'react';
import {StyleSheet, View, Modal, Text, ActivityIndicator} from 'react-native';

const Loader = (props) => {
  const {loading} = props;

  return (
    <Modal transparent={true} animationType={'fade'} visible={loading}>
      <View style={styles.modalBackground} />
      <View style={styles.activityIndicatorWrapper}>
        <View style={styles.square}>
          <ActivityIndicator size="large" color="#0000ff" animating={loading} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: 0.4,
    position: 'relative',
  },
  activityIndicatorWrapper: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default Loader;
