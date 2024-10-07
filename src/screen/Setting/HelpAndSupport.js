import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Platform,
} from 'react-native';
import { Colors } from '../../assets/Colors';
import { HelpAddress, HelpEmailImage, HelpMobileImage, HelpSupportPng, LeftArrow } from '../../assets/Images'; // Ensure these images exist
import LinearGradient from 'react-native-linear-gradient';

const helpSupportList = [
    {
        image: HelpEmailImage,
        title: 'Email',
        description: 'quicklyplatforms@gmail.com',
    },
    {
        image: HelpMobileImage,
        title: 'Mobile',
        description: '+91 8871322722',
    },
    {
        image: HelpAddress,
        title: 'Address',
        description: '407 - Onam Plaza, Near by Industry House Indore - 452010 (M.P)',
    },
];
const HelpAndSupport = ({ navigation }) => {
    return (
        <LinearGradient colors={[Colors.themeColor, '#34AEA1']} style={styles.container}>

            <SafeAreaView >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Image source={LeftArrow} style={styles.backButtonText} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Help & Support</Text>
                    <View style={styles.backButton} />
                </View>

                {/* Body */}
                <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                    <View style={styles.bannerCard}>
                        <Image source={HelpSupportPng} style={styles.bannerImage} />
                    </View>

                    <View style={styles.cardContainer}>
                        {helpSupportList.map((data, index) => (
                            <View style={styles.card}>
                                <Image source={data.image} style={styles.cardImage} />
                                <Text style={styles.cardTitle}>{data.title}</Text>
                                <Text style={styles.cardDetail}>{data.description}</Text>
                            </View>
                        ))}

                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingVertical: 15,
    },
    backButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: {
        height: 20,
        width: 20,
        tintColor: Colors.White,
    },
    headerTitle: {
        color: Colors.White,
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
      },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 15,
    },
    bannerCard: {
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        marginTop: 10,
    },

    bannerImage: {
        width: '100%',
        height: 140,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    cardContainer: {
        marginVertical: 10,
        marginBottom: 120,
    },
    card: {
        backgroundColor: '#ffff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.25,
    },
    cardImage: {
        width: 280,
        height: 170,
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.Black,
        marginBottom: 5,
    },
    cardDetail: {
        fontSize: 14,
        fontWeight: '400',
        color: Colors.Black,
        textAlign: 'center',
    },
});

export default HelpAndSupport;
