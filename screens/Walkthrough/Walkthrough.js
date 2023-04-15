import React from 'react';
import {
    View,
    Text,
    Animated,
} from 'react-native';
import {COLORS,SIZES, FONTS,constants} from '../../constants';
import {TextButton} from '../../components';
import Walkthrough1 from './Walkthrough1';
import Walkthrough2 from './Walkthrough2';
import Walkthrough3 from './Walkthrough3';
import Walkthrough4 from './Walkthrough4';

const Walkthrough = ({navigation}) => {

    const [walkthrough2Animate, setWalkthrough2Animate] = React.useState(false);
    const [walkthrough3Animate, setWalkthrough3Animate] = React.useState(false);
    const [walkthrough4Animate, setWalkthrough4Animate] = React.useState(false);
    const onViewChangeRef = React.useRef(({viewableItems,changed}) => {
        if(viewableItems[0].index == 1){
            setWalkthrough2Animate(true);
        }
        if (viewableItems[0].index == 2) {
            setWalkthrough3Animate(true);
        }
        if (viewableItems[0].index == 3) {
            setWalkthrough4Animate(true);
        }
    })
    const scrollX = React.useRef(new Animated.Value(0)).current;

    const Dots = () => {

        const dotPosition = Animated.divide(scrollX,SIZES.width);

        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent:'center'
                }}
            >
                {constants.walkthrough.map((item,index) =>{

                    const dotColor = dotPosition.interpolate({
                        inputRange:[index -1,index,index+1],
                        outputRange:[COLORS.dark08,COLORS.primary,COLORS.dark08],
                        extrapolate:"clamp"
                    })

                    return (
                        <Animated.View 
                            key={`dot-${index}`}
                            style={{
                                borderRadius:5,
                                marginHorizontal: 6,
                                width:10,
                                height:10,
                                backgroundColor: dotColor
                            }}
                        />
                    )
                })}
            </View>
        )
    }

    function renderFooter(){
        return (
            <View
                style={{
                    position:'absolute',
                    bottom:0,
                    left:0,
                    right:0,
                    height:SIZES.height * 0.2,
                    alignItems:'center',
                    justifyContent:'space-between',
                    paddingHorizontal: SIZES.padding,
                    paddingVertical:SIZES.height > 700 ? SIZES.padding : 20,
                }}
            >
                <Dots />
                {/* Button */}
                <View
                    style={{
                        flexDirection: 'row',
                        height:55,
                    }}
                >   
                    <TextButton 
                        label="Join Now"
                        contentContainerStyle={{
                            flex:1,
                            borderRadius: SIZES.radius,
                            backgroundColor:COLORS.lightGrey
                        }}
                        labelStyle={{
                            colors:COLORS.primary,
                            ...FONTS.h3,
                        }}
                    />
                    <TextButton 
                        label="Log in"
                        contentContainerStyle={{
                            flex:1,
                            marginLeft: SIZES.radius,
                            borderRadius: SIZES.radius,
                            backgroundColor:COLORS.primary
                        }}
                        labelStyle={{
                            ...FONTS.h3,
                        }}
                        onPress={() => {
                            navigation.reset({
                                index: 0,
                                routes:[{name:'AuthMain'}]
                            })
                        }}
                    />
                </View>
            </View>
        )
    }

    return (
        <View
            style={{
                flex:1,
                backgroundColor:COLORS.light
            }}
        >
            <Animated.FlatList 
                data={constants.walkthrough}
                keyExtractor={(item) => item.id}
                horizontal
                snapToInterval={SIZES.width}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewChangeRef.current}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{nativeEvent:{contentOffset:{x:scrollX}}}],
                    {
                        useNativeDriver:false
                    }
                )}
                renderItem={({item,index}) => {
                    return (
                        <View
                            key={index}
                            style={{
                                width:SIZES.width,
                                justifyContent:'center'
                            }}
                        >
                            {/*Walkthrough Images */}
                            <View
                                style={{
                                    flex:1,
                                    justifyContent: 'center'
                                }}
                            >
                                {index == 0 && <Walkthrough1 />}
                                {index == 1 && <Walkthrough2 animate={walkthrough2Animate} />}
                                {index == 2 && <Walkthrough3 animate={walkthrough3Animate} />}
                                {index == 3 && <Walkthrough4 animate={walkthrough4Animate} />}
                            </View>
                            {/*Title and Desc*/}
                            <View
                                style={{
                                    height:SIZES.height * 0.35,
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    paddingHorizontal: SIZES.padding,
                                }}
                            >
                                <Text
                                    style={{
                                        ...FONTS.h1
                                    }}
                                >
                                    {item.title}
                                </Text>
                                <Text
                                    style={{
                                        marginTop: SIZES.radius,
                                        textAlign:'center',
                                        ...FONTS.body3,
                                        colors:COLORS.grey,
                                    }}
                                >
                                    {item.sub_title}
                                </Text>
                            </View>
                        </View>
                    )
                }}
            />
            {renderFooter()}
        </View>
    )
}

export default Walkthrough;