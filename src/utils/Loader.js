import React from 'react';
import { View, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import { colors } from './Colors'

export function Loader({ isLoading}) {
  const renderLoader = () => {
    return (
      <View style={styles.activityIndicatorContainer}>
        <View
          style={[
            styles.activityIndicatorWrapper,
            { backgroundColor: colors.Gray2,opacity: 0.5 }
          ]}
        >
          <ActivityIndicator
            size='large'
            style={styles.loading}
            animating={true}
            hidesWhenStopped={true}
            color={colors.colorPrimary}
          />
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <Modal style={styles.loading} transparent={true} animationType={'none'}>
        {renderLoader()}
      </Modal>
    );
 }

  return null;
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
     
  },

  activityIndicatorContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: colors.popupOverlay
  },

  activityIndicatorWrapper: {
    height: '100%',
    width: '100%',
    flex:1 
  }
});
