import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, Dimensions } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe";

const VideoComponent = ({ videos }) => {
    const [playing, setPlaying] = useState(false);
    const [trailerVideo, setTrailerVideo] = useState(undefined);
    const [videoIndex, setVideoIndex] = useState(0);
    const [error, setError] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const [orientation, setOrientation] = useState(Dimensions.get('window').orientation);

    useEffect(() => {
        if (!!videos) {
            setTrailerVideo(videos[videoIndex]?.key);
        }
    }, [videos, videoIndex]);

    useEffect(() => {
        if (error) {
            const newIndex = videoIndex + 1;
            if (newIndex < videos.length) {
                setVideoIndex(videoIndex + 1)
            } else {
                setError(null)
                setTrailerVideo(null)
            }
        }
    }, [error])

    const handleFullScreenChange = (isFullscreen) => {
        console.log('isFullscreen', isFullscreen);
        if (isFullscreen) {
            setOrientation(Dimensions.get('window').orientation);
        } else {
            setOrientation(Dimensions.get('window').orientationLocked);
        }
    };

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
        }
    }, []);

    return trailerVideo === null ? <View /> :
        (
            <View>
                <YoutubePlayer
                    height={200}
                    play={playing}
                    videoId={trailerVideo}
                    onChangeState={onStateChange}
                    webViewStyle={{ opacity: 0.99 }}
                    initialPlayerParams={{

                        modestbranding: true,
                        rel: false,
                        showinfo: false,
                    }}
                    onReady={e => {
                        console.log("onReady")
                        setIsReady(true)
                    }
                    }
                    onError={e => { setError(e) }}
                    onFullScreenChange={handleFullScreenChange}
                />
            </View>
        );
};

export default VideoComponent