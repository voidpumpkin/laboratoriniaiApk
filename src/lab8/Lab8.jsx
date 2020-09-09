import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { useTheme } from 'react-native-paper';
import Svg from 'react-native-svg';
import {
    State,
    PinchGestureHandler,
    FlingGestureHandler,
    Directions,
} from 'react-native-gesture-handler';
import figures from './figures';
import { Audio } from 'expo-av';
import failSound from '../../assets/oh-boy.mp3';
import succesSound from '../../assets/when.mp3';

//these values are relative to container component rect
const SWIPE_LENGTH_SCALE = 0.3;

const circle = figures.find(({ name }) => name === 'Circle');

const Lab8 = () => {
    const { colors } = useTheme();
    const [figureindex, setFigureIndex] = useState(0);
    const { Component: FigureComponent, getProps, getPropsInCircle } = figures[figureindex];
    const [viewRect, setViewRect] = useState(null);

    const [figureProps, setFigureProps] = useState(null);
    const [showFigure, setShowFigure] = useState(true);

    const [circleProps, setCircleProps] = useState(null);
    const [showCircle, setShowCircle] = useState(false);

    const beginPinchCirclePropsRef = useRef(null);
    const swipeMinLengthRef = useRef(null);

    const successPlaybackInstanceRef = useRef(null);
    const failPlaybackInstanceRef = useRef(null);

    const flingStartXRef = useRef(0);

    const setupSuccessSound = async () => {
        const { sound } = await Audio.Sound.createAsync(succesSound);
        successPlaybackInstanceRef.current = sound;
    };

    const setupFailSound = async () => {
        const { sound } = await Audio.Sound.createAsync(failSound);
        failPlaybackInstanceRef.current = sound;
    };

    const playSucces = async () => {
        if (!successPlaybackInstanceRef.current) {
            return;
        }
        await successPlaybackInstanceRef.current.replayAsync();
    };
    const playFail = async () => {
        if (!failPlaybackInstanceRef.current) {
            return;
        }
        await failPlaybackInstanceRef.current.replayAsync();
    };

    useEffect(() => {
        //setup sounds
        Audio.setAudioModeAsync({ playThroughEarpieceAndroid: false });
        setupSuccessSound();
        setupFailSound();
        return async () => {
            if (successPlaybackInstanceRef.current != null) {
                await successPlaybackInstanceRef.current.unloadAsync();
            }
            if (failPlaybackInstanceRef.current != null) {
                await failPlaybackInstanceRef.current.unloadAsync();
            }
        };
    }, []);

    useEffect(() => {
        if (!viewRect) {
            return;
        }
        swipeMinLengthRef.current = viewRect.width * SWIPE_LENGTH_SCALE;
        setFigureProps(getProps(viewRect));
    }, [getProps, viewRect]);

    const updateFigureIndex = (swipeDirection) => {
        setShowFigure(true);
        let newIndex;
        if (swipeDirection === 'left') {
            newIndex = figureindex === 0 ? figures.length - 1 : figureindex - 1;
        } else if (swipeDirection === 'right') {
            newIndex = figureindex === figures.length - 1 ? 0 : figureindex + 1;
        }
        const { getProps } = figures[newIndex];
        setFigureProps(getProps(viewRect));
        setFigureIndex(newIndex);
    };

    const handleFlingStateChange = (event) => {
        const { state, x } = event.nativeEvent;
        const translationX = flingStartXRef.current - x;
        switch (state) {
            case State.START:
                flingStartXRef.current = x;
                break;
            case State.ACTIVE:
                if (translationX > swipeMinLengthRef.current) {
                    updateFigureIndex('left');
                } else if (translationX < -swipeMinLengthRef.current) {
                    updateFigureIndex('right');
                }
                break;
        }
    };

    const handlePinchStateChangeEvent = (event) => {
        switch (event.nativeEvent.state) {
            case State.BEGAN:
                var newCircleprops = {
                    ...circle.getProps(viewRect, false),
                    fill: 'white',
                };
                setShowFigure(false);
                setCircleProps(newCircleprops);
                beginPinchCirclePropsRef.current = newCircleprops;
                break;
            case State.END:
                setFigureProps(
                    getPropsInCircle(circleProps, figureProps, { playSucces, playFail })
                );
                setShowFigure(true);
                setShowCircle(false);
                beginPinchCirclePropsRef.current = null;
                break;
            case State.CANCELLED:
            case State.FAILED:
                setShowFigure(true);
                setShowCircle(false);
                beginPinchCirclePropsRef.current = null;
                break;
        }
    };

    const handlePinchEvent = (event) => {
        const { scale, focalX: cx, focalY: cy, numberOfPointers } = event.nativeEvent;
        if (!beginPinchCirclePropsRef.current || !circleProps) {
            return;
        }
        if (!showCircle && numberOfPointers === 2) {
            setShowCircle(true);
        }
        setCircleProps({
            ...circleProps,
            ...circle.applyScale(beginPinchCirclePropsRef.current, scale),
            cx,
            cy,
        });
    };

    return (
        <PinchGestureHandler
            onGestureEvent={handlePinchEvent}
            onHandlerStateChange={handlePinchStateChangeEvent}
        >
            <FlingGestureHandler
                onHandlerStateChange={handleFlingStateChange}
                maxPointers={1}
                direction={Directions.RIGHT | Directions.LEFT}
            >
                {/* Required for ios */}
                <Animated.View style={[styles.panHandler, { backgroundColor: colors.background }]}>
                    <Svg
                        height="100%"
                        width="100%"
                        onLayout={(event) => setViewRect(event.nativeEvent.layout)}
                    >
                        {showCircle && circleProps && <circle.Component {...circleProps} />}
                        {showFigure && figureProps && <FigureComponent {...figureProps} />}
                    </Svg>
                </Animated.View>
            </FlingGestureHandler>
        </PinchGestureHandler>
    );
};

export default Lab8;

const styles = StyleSheet.create({
    panHandler: {
        flex: 1,
        justifyContent: 'center',
    },
});
