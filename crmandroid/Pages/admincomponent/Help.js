import { StyleSheet, Text, View, ScrollView } from 'react-native'
const Help = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>

                <View style={styles.container}>
                    <Text style={styles.header}>Help</Text>
                    <Text style={styles.text}>At H&M Innovance, we take your privacy seriously and are committed to protecting it. This Privacy Policy explains how we collect, use, and disclose your personal information when you use our mobile application built using React Native.</Text>
                </View>

            </ScrollView>
        </View>
    )
}

export default Help;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
})