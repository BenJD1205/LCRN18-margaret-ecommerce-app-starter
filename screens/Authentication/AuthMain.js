import React from 'react';
import {
    View,
    Text,
    Image,
    Modal,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
} from 'react-native';
import { MotiView, useAnimationState} from 'moti';
import { Shadow } from 'react-native-shadow-2';
import {
    CountryDropDown,
    TextButton,
} from "../../components";
import {
    icons,
    images,
    COLORS,
    FONTS,
    SIZES,
} from '../../constants';

const AuthMain = () => {

    //States
    const [mode, setMode] = React.useState("signin");

    //Animation States
    const animateState = useAnimationState({
        signIn: {
            height:SIZES.height * 0.55
        },
        signUp:{
            height:SIZES.height* 0.7
        }
    })

    // Country
    const [countries, setCountries] = React.useState([])
    const [showCountryModal, setShowCountryModal] = React.useState(false)

    React.useEffect(() => {
        // Fetch countires
        fetch("https://restcountries.com/v2/all")
            .then(response => response.json())
            .then(data => {
                let countryData = data.map(item => {
                    return {
                        code: item.alpha2Code,
                        name: item.name,
                        callingCode: `+${item.callingCodes[0]}`,
                        flag: `https://countryflagsapi.com/png/${item.alpha2Code}`
                    }
                })

                setCountries(countryData)
            })
    }, [])

    // Render

    function renderCountryModal() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showCountryModal}
            >
                <TouchableWithoutFeedback
                    onPress={() => setShowCountryModal(false)}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.dark80
                        }}
                    >
                        <View
                            style={{
                                height: 400,
                                width: SIZES.width * 0.8,
                                backgroundColor: COLORS.light,
                                borderRadius: SIZES.radius
                            }}
                        >
                            <FlatList
                                data={countries}
                                keyExtractor={(item) => item.code}
                                contentContainerStyle={{
                                    paddingHorizontal: SIZES.padding,
                                    paddingBottom: SIZES.padding,
                                }}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginTop: SIZES.radius
                                            }}
                                            onPress={() => {
                                                console.log(item)
                                                setSelectedCountry(item)
                                                setShowCountryModal(false)
                                            }}
                                        >
                                            <Image
                                                source={{ uri: item.flag }}
                                                resizeMode="contain"
                                                style={{
                                                    width: 40,
                                                    height: 30
                                                }}
                                            />
                                            <Text style={{ flex: 1, marginLeft: SIZES.radius, ...FONTS.body3 }}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    function renderSignIn() {
        return (
            <MotiView
                state={animateState}
                style={{
                    marginTop: SIZES.padding,
                    height:SIZES.height * 0.55,
                }}
            >
                <Shadow>
                    <View
                        style={styles.authContainer}
                    >

                    </View>
                </Shadow>
            </MotiView>
        )
    }

    function renderAuthContainer() {
        if (mode == "signin") {
            return renderSignIn()
        } else {
            return renderSignUp();
        }
    }

    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: SIZES.padding,
                backgroundColor:COLORS.lightGrey,
            }}
        >
            {/*Logo */}
            <Image 
                source={images.logo}
                style={{
                    alignSelf: 'center',
                    marginTop: SIZES.padding * 2,
                    width:50,
                    height:50,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    authContainer: {
        flex: 1,
        width: SIZES.width - (SIZES.padding * 2),
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor:COLORS.light
    }
})

export default AuthMain;