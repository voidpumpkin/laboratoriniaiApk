import { Colors } from 'react-native-paper';
import { Rect, Circle } from 'react-native-svg';

//these values are relative to container component rect
const FIGURE_INITIAL_SCALE = 0.3;
const LINE_WIDTH_SCALE = 0.06;

function getRandom(min = 0, max = 1) {
    return Math.random() * (max - min) + min;
}

const collectRotationValues = (rotationString) =>
    rotationString.substring(7, rotationString.length - 1).split(',');

const calcCenter = (containerLength, length = 0) => containerLength / 2 - length / 2;

const applyRectScale = (figureProps, scale) => {
    const width = +figureProps.width * scale;
    const height = +figureProps.height * scale;
    const dx = -(width - +figureProps.width) / 2;
    const dy = -(height - +figureProps.height) / 2;
    const x = +figureProps.x + dx;
    const y = +figureProps.y + dy;
    return { width, height, x, y };
};

const getRectPropsInCircle = (circleProps, figureProps, { playSucces, playFail }) => {
    const { width, height, transform } = figureProps;
    const widthR = +width / 2;
    const heightR = +height / 2;
    const rectR = widthR > heightR ? widthR : heightR;
    const [rotation] = collectRotationValues(transform);
    if (rectR <= circleProps.r) {
        const x = circleProps.cx - widthR;
        const y = circleProps.cy - heightR;
        const transform = `rotate(${rotation},${x + width / 2},${y + height / 2})`;
        playSucces();
        return { ...figureProps, x, y, transform };
    }
    playFail();
    return figureProps;
};

const figures = [
    {
        name: 'Circle',
        Component: Circle,
        getProps: (viewRect, shouldRandomize = true) => {
            const scale = shouldRandomize ? getRandom() : FIGURE_INITIAL_SCALE;
            const smallerAxis = viewRect.width < viewRect.height ? viewRect.width : viewRect.height;
            const radius = (smallerAxis / 2) * scale;
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
        getProps: (viewRect, shouldRandomize = false) => {
            const scale = shouldRandomize ? getRandom() : FIGURE_INITIAL_SCALE;
            const width = viewRect.width * scale;
            const height = viewRect.width * scale;
            const x = calcCenter(viewRect.width, width);
            const y = calcCenter(viewRect.height, height);
            const rotation = getRandom(0, 90);
            return {
                x: x + '',
                y: y + '',
                width: width + '',
                height: height + '',
                fill: Colors.lightBlue500,
                transform: `rotate(${rotation},${x + width / 2},${y + height / 2})`,
            };
        },
        applyScale: applyRectScale,
        getPropsInCircle: getRectPropsInCircle,
    },
    {
        name: 'Line',
        Component: Rect,
        getProps: (viewRect, shouldRandomize = true) => {
            const scale = shouldRandomize ? getRandom() : FIGURE_INITIAL_SCALE;
            const width = viewRect.width * LINE_WIDTH_SCALE;
            const height = viewRect.height * scale;
            const x = calcCenter(viewRect.width, width);
            const y = calcCenter(viewRect.height, height);
            const rotation = getRandom(0, 90);
            return {
                x: calcCenter(viewRect.width, width) + '',
                y: calcCenter(viewRect.height, height) + '',
                width: width + '',
                height: height + '',
                fill: Colors.red500,
                transform: `rotate(${rotation},${x + width / 2},${y + height / 2})`,
            };
        },
        applyScale: applyRectScale,
        getPropsInCircle: getRectPropsInCircle,
    },
];

export default figures;
