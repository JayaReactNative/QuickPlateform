import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    FlatList,
} from 'react-native'
import { Colors } from '../../assets/Colors';
import { HelpSupportPng, LeftArrow } from '../../assets/Images';

const cardData = [
    {
        id: '1',
        title: 'Use License',
        description: 'This section grants you a non-exclusive, non-transferable license to use the service for personal purposes. Redistribution, resale, or modification of the service or its content is not permitted without explicit permission from the provider.',
        bulletPoints: [
            'Non-exclusive, non-transferable license for personal use only.',
            'No redistribution or resale of the service.',
            'No modification or creation of derivative works without permission.',
        ],
    },
    {
        id: '2',
        title: 'Restrictions',
        description: 'Users must adhere to specific restrictions to ensure proper use of the service. These include compliance with laws, prohibition of unauthorized access, and restrictions on content redistribution.',
        bulletPoints: [
            'No illegal use or violation of laws.',
            'No unauthorized access or hacking.',
            'No redistribution of content without authorization.',
        ],
    },
    {
        id: '3',
        title: 'User Obligations',
        description: 'Users are responsible for maintaining accurate account information and securing their login credentials. They must also report any unauthorized use of their account promptly.',
        bulletPoints: [
            'Provide accurate registration information.',
            'Maintain confidentiality of account credentials.',
            'Report unauthorized account use immediately.',
        ],
    },
    {
        id: '4',
        title: 'Privacy Policy',
        description: 'Our privacy policy explains how we collect, use, and protect your personal data. We are committed to safeguarding your information and using it responsibly.',
        bulletPoints: [
            'Collect personal data like name and email for service improvement.',
            'Use data to personalize user experience and notify about updates.',
            'Implement security measures to protect your data.',
        ],
    },
    {
        id: '5',
        title: 'Termination',
        description: 'Access to the service may be terminated for violations of terms or illegal activities. Users may request data copies before termination, and reinstatement is at the provider’s discretion.',
        bulletPoints: [
            'Termination for terms violations or illegal activities.',
            'Request data copies before termination.',
            'Reinstatement is at the provider’s discretion.',
        ],
    },
];

export default function TermsAndCondition({ navigation }) {
    const renderCard = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.divider} />
                <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
            <Text style={styles.cardDescription}>{item.description}</Text>
            <View style={styles.bulletPoints}>
                {item.bulletPoints.map((point, index) => (
                    <Text key={index} style={styles.bulletPoint}>
                        {'• '} {point}
                    </Text>
                ))}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image source={LeftArrow} style={styles.backButtonImage} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Terms And Conditions</Text>
                <View style={styles.backButton} />
            </View>

            {/* Body */}
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.bannerCard}>
                    <Image source={HelpSupportPng} style={styles.bannerImage} />
                </View>
                <View>
                    <FlatList
                        data={cardData}
                        renderItem={renderCard}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.cardList}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    header: {
        backgroundColor: Colors.themeColor,
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
    backButtonImage: {
        height: 20,
        width: 20,
        tintColor: Colors.White,
    },
    headerTitle: {
        color: Colors.White,
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        // paddingHorizontal: 15,
    },

    bannerCard: {
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        marginBottom: 20,
    },

    bannerImage: {
        width: '100%',
        height: 140,
        resizeMode: 'cover',
    },

    cardList: {
        paddingBottom: 20,
    },

    card: {
        backgroundColor: Colors.White,
        // borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        elevation: 2, shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        marginHorizontal: 10,
    },

    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    divider: {
        backgroundColor: 'yellow',
        width: 5,
        height: 20,
        marginRight: 10,
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.Black,
    },

    cardDescription: {
        fontSize: 14,
        color: Colors.Gray,
        marginBottom: 10,
    },

    bulletPoints: {
        marginLeft: 15,
    },

    bulletPoint: {
        fontSize: 14,
        color: Colors.Black,
    },
});
