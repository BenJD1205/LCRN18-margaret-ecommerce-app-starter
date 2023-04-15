import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import { MotiImage, useDynamicAnimation } from 'moti';

import { SIZES, images } from '../../constants';

const Walkthrough4 = ({animate}) => {

    //Moti initial position
    const motiImage1 = useDynamicAnimation(() => ({
        top: "40%",
        left:"25%"
    }))

    const motiImage2 = useDynamicAnimation(() => ({
        top:'38%',
        left:"45%"
    }))

    const motiImage3 = useDynamicAnimation(() => ({
        top:'55%',
        left:"50%"
    }))

    React.useEffect(() => {
        if (animate) {
            motiImage1.animateTo({
                top: "20%",
                left:-5
            })

            motiImage2.animateTo({
                top: "30%",
                left:"80%"
            })

            motiImage3.animateTo({
                top: "62%",
                left:"85%"
            })
        }
    }, [animate])

    return (
        <View style={{flex:1,overflow:'hidden'}}>
            <Image
                source={images.walkthrough_04_01}
                style={{
                    ...styles.image,
                    top: "25%",
                    left: "30%",
                    width: 150,
                    height: 250,
                    zIndex:1,
                }}
            />

            <MotiImage 
                state={motiImage1}
                source={images.walkthrough_04_02}
                style={styles.image}
            />

            <MotiImage 
                state={motiImage2}
                source={images.walkthrough_04_03}
                style={styles.image}
            />

            <MotiImage 
                state={motiImage3}
                source={images.walkthrough_04_04}
                style={styles.image}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    image:{
        position:'absolute',
        width:86,
        height:112,
        zIndex:2,
        borderRadius: SIZES.radius
    }
})

export default Walkthrough4;