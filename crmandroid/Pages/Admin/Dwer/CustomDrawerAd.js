import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

const CustomDrawerAd = props => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerListWrapper}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerAd;

const styles = StyleSheet.create({
  drawerListWrapper: {
    marginTop: 10,
    // borderColor: "red", 
  },
});