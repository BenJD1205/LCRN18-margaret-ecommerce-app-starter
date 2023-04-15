import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import { MotiImage, useDynamicAnimation } from 'moti';

import { SIZES, images } from '../../constants';

const Walkthrough3 = ({animate}) => {

    //Moti initial position
    const motiImage1 = useDynamicAnimation(() => ({
        top: "30%",
        left:"25%"
    }))

    const motiImage2 = useDynamicAnimation(() => ({
        top:'45%',
        left:"15%"
    }))

    const motiImage3 = useDynamicAnimation(() => ({
        top:'58%',
        left:"25%"
    }))

    const motiImage4 = useDynamicAnimation(() => ({
        top:'61%',
        left:"40%"
    }))

    React.useEffect(() => {
        if (animate) {
            motiImage1.animateTo({
                top: "50%",
                left:"38%"
            })

            motiImage2.animateTo({
                top: "30%",
                left:"12%"
            })

            motiImage3.animateTo({
                top: "65%",
                left:"15%"
            })

            motiImage4.animateTo({
                top: "60%",
                left:"60%"
            })
        }
    }, [animate])

    return (
        <View style={{flex:1,overflow:'hidden'}}>

            <MotiImage 
                state={motiImage1}
                source={images.walkthrough_03_01}
                style={styles.image}
            />

            <MotiImage 
                state={motiImage2}
                source={images.walkthrough_01_01}
                style={styles.image}
            />

            <MotiImage 
                state={motiImage3}
                source={images.walkthrough_03_02}
                style={styles.image}
            />

            <MotiImage 
                state={motiImage4}
                source={images.walkthrough_01_02}
                style={styles.image}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    image:{
        position:'absolute',
        width:106,
        height:101,
        zIndex:0,
        borderRadius: SIZES.radius
    }
})

export default Walkthrough3;