import react, { Dispatch, SetStateAction } from 'React';
import LottieView from 'lottie-react-native';
import { Text, View } from 'react-native';

interface SplashProps {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const Splash = ({setIsLoading}: SplashProps) => {
    return (
        <View style={{flex:1, alignItems: 'center', margin: 0}}>
            <Text>Alpha 0.1</Text>
            <LottieView
                source={require('')}
                autoPlay
                loop={false}
                resizeMode='cover'
                onAnimationFinish={() => setIsLoading(false)}
            ></LottieView>

        </View>
    )
}