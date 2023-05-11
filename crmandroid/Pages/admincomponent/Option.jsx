import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';

const userNames = ['User 1', 'User 1', 'User 1', 'User 1', 'User 1', 'User 1', 'User 1', 'User 1', 'User 2', 'User 3', 'User 4', 'User 5', 'User 6', 'User 7', 'User 8', 'User 9', 'User 10'];

const Option = () => {
    const [selectedValue, setSelectedValue] = useState('');
    return (
        <>
            <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 110 }}
                onValueChange={(itemValue) => setSelectedValue(itemValue)}>
                {userNames.map((userName) => (
                    <Picker.Item key={userName} label={userName} value={userName} />
                ))}
            </Picker>
        </>
    )
}

export default Option;