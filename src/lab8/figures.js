import { Colors } from 'react-native-paper';
import { Rect, Circle } from 'react-native-svg';

//these values are relative to container component rect
const FIGURE_INITIAL_SCALE = 0.3;
const LINE_WIDTH_SCALE = 0.06;

function getRandom(min = 0, max = 1) {
    return Math.random() * (max - min) + min;
}

const calcCenter = (containerLength, length = 0) => containerLength / 2 - length / 2;

const isFingerInsideRect = (nativeEvent, figureProps) => {
    const { x, y, width, height } = figureProps;
    const { x: eX, y: eY } = nativeEvent;
    const x1 = +width + +x;
    const y1 = +height + +y;
    return eX < x1 && eY < y1 && eX > x && eY > y;
};

const applyRectScale = (figureProps, scale) => {
    const width = +figureProps.width * scale;
    const height = +figureProps.height * scale;
    const dx = -(width - +figureProps.width) / 2;
    const dy = -(height - +figureProps.height) / 2;
    const x = +figureProps.x + dx;
    const y = +figureProps.y + dy;
    return { width, height, x, y };
};

const applyRectTranslation = ({ x, y }, translationX, translationY) => {
    return {
        x: Math.floor(translationX) + +x,
        y: Math.floor(translationY) + +y,
    };
};

const getRectPropsInCircle = (circleProps, figureProps, { playSucces, playFail }) => {
    const { width, height } = figureProps;
    const widthR = +width / 2;
    const heightR = +height / 2;
    const rectR = widthR > heightR ? widthR : heightR;
    if (rectR <= circleProps.r) {
        const x = circleProps.cx - widthR;
        const y = circleProps.cy - heightR;
        playSucces();
        return { ...figureProps, x, y };
    }
    playFail();
    return figureProps;
};

const figures = [
    {
        name: 'Circle',
        Component: Circle,
        isFingerInside: (nativeEvent, figureProps) => {
            const { cx, cy, r } = figureProps;
            const { x, y } = nativeEvent;
            return Math.pow(+cx - +x, 2) + Math.pow(+cy - +y, 2) <= Math.pow(r, 2);
        },
        getProps: (viewRect, shouldRandomize = true) => {
            const scale = shouldRandomize ? getRandom() : FIGURE_INITIAL_SCALE;
            const radius = viewRect.width * scale;
            return {
                cx: calcCenter(viewRect.width) + '',
                cy: calcCenter(viewRect.height) + '',
                r: radius + '',
                fill: Colors.lightGreen500,
            };
        },
        applyScale: ({ r }, scale) => {
            return { r: +r * scale };
        },
        applyTransform: ({ cx, cy }, translationX, translationY) => {
            return {
                cx: Math.floor(translationX) + +cx,
                cy: Math.floor(translationY) + +cy,
            };
        },
        getPropsInCircle: (circleProps, figureProps, { playSucces, playFail }) => {
            if (figureProps.r <= circleProps.r) {
                playSucces();
                return { ...circleProps, fill: figureProps.fill, r: figureProps.r };
            }
            playFail();
            return figureProps;
        },
    },
    {
        name: 'Square',
        Component: Rect,
        isFingerInside: isFingerInsideRect,
        getProps: (viewRect, shouldRandomize = true) => {
            const scale = shouldRandomize ? getRandom() : FIGURE_INITIAL_SCALE;
            const width = viewRect.width * scale;
            const height = viewRect.width * scale;
            return {
                x: calcCenter(viewRect.width, width) + '',
                y: calcCenter(viewRect.height, height) + '',
                width: width + '',
                height: height + '',
                fill: Colors.lightBlue500,
            };
        },
        applyScale: applyRectScale,
        applyTransform: applyRectTranslation,
        getPropsInCircle: getRectPropsInCircle,
    },
    {
        name: 'Line',
        Component: Rect,
        isFingerInside: isFingerInsideRect,
        getProps: (viewRect, shouldRandomize = true) => {
            const scale = shouldRandomize ? getRandom() : FIGURE_INITIAL_SCALE;
            const width = viewRect.width * LINE_WIDTH_SCALE;
            const height = viewRect.height * scale;
            return {
                x: calcCenter(viewRect.width, width) + '',
                y: calcCenter(viewRect.height, height) + '',
                width: width + '',
                height: height + '',
                fill: Colors.red500,
            };
        },
        applyScale: applyRectScale,
        applyTransform: applyRectTranslation,
        getPropsInCircle: getRectPropsInCircle,
    },
];

export default figures;
