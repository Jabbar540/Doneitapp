import React from 'react';
import { View , StyleSheet, Modal } from 'react-native';
import * as Progress from 'react-native-progress';
import colors from '../config/colors';
import LottieView from 'lottie-react-native';

function UploadScreen({onDone, progress=0, visible=false}) {
    return (
        <Modal visible={visible}>
            <View style={styles.container}>
                {progress < 1 ?(
                 <Progress.Bar color={colors.primary} width={200} progress={progress}/>
                 ):(
                 <LottieView
                 autoPlay
                 onAnimationFinish={onDone}
                 loop={false}
                 source={require('../assets/animations/done.json')}
                 style={styles.animation}/>
                 )
                }
            </View>
        </Modal>

    );
}
const styles = StyleSheet.create({
    animation:{
        width:150
    },
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})


export default UploadScreen;