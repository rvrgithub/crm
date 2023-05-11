import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = () => (
    <View style={styles.spinnerContainer}>
        <ActivityIndicator size={42} />
    </View>
);

const styles = {
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default Spinner;