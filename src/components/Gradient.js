import { LinearGradient } from "expo-linear-gradient";
import { BACKDROP_HEIGHT, SCREEN } from "../common/constants";

const { width, height } = SCREEN

const Gradient = () => (
    <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'white']}
        style={{
            height: BACKDROP_HEIGHT,
            width,
            position: 'absolute',
            bottom: 0
        }}
    />
)

export default Gradient;
