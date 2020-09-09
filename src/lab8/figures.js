import { Colors } from 'react-native-paper';
import { Rect, Circle, Polygon } from 'react-native-svg';

//these values are relative to container component rect
const FIGURE_INITIAL_SCALE = 0.3;
const LINE_WIDTH_SCALE = 0.03;

function getRandom(min = 0, max = 1) {
    return Math.random() * (max - min) + min;
}

const calcStarPoints = (centerX, centerY, innerCirclePoints, innerRadius, outerRadius) => {
    const angle = Math.PI / innerCirclePoints;
    const angleOffsetToCenterStar = 0;

    const totalPoints = innerCirclePoints * 2; // 10 in a 5-points star
    const points = [];
    for (let i = 0; i < totalPoints; i++) {
        let isEvenIndex = i % 2 == 0;
        let r = isEvenIndex ? outerRadius : innerRadius;
        let currX = centerX + Math.cos(i * angle + angleOffsetToCenterStar) * r;
        let currY = centerY + Math.sin(i * angle + angleOffsetToCenterStar) * r;
        points.push(currX);
        points.push(currY);
    }
    return points;
};

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
    const { width, height, transform: oldTransform } = figureProps;
    const diagonal = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    const d = circleProps.r * 2;
    if (diagonal <= d) {
        const x = circleProps.cx - width / 2;
        const y = circleProps.cy - height / 2;
        const transform = {
            ...oldTransform,
            originX: x + width / 2,
            originY: y + height / 2,
        };
        playSucces();
        return { ...figureProps, x, y, transform };
    }
    playFail();
    return figureProps;
};

const getPolygonPropsInCircle = (circleProps, figureProps, { playSucces, playFail }) => {
    const { width, height, transform: oldTransform } = figureProps;
    const d = circleProps.r * 2;
    if (width <= d) {
        const x = circleProps.cx - width / 2;
        const y = circleProps.cy - height / 2;
        const transform = {
            ...oldTransform,
            originX: width / 2,
            originY: height / 2,
        };
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
            const smallerAxis = Math.min(viewRect.width, viewRect.height);
            const radius = (smallerAxis / 2) * scale;
            return {
                cx: calcCenter(viewRect.width),
                cy: calcCenter(viewRect.height),
                r: radius,
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
        getProps: (viewRect, shouldRandomize = true) => {
            const scale = shouldRandomize ? getRandom() : FIGURE_INITIAL_SCALE;
            const width = viewRect.width * scale;
            const height = viewRect.width * scale;
            const x = calcCenter(viewRect.width, width);
            const y = calcCenter(viewRect.height, height);
            const rotation = shouldRandomize ? getRandom(0, 90) : 0;
            return {
                x,
                y,
                width,
                height,
                fill: Colors.lightBlue500,
                transform: {
                    rotation,
                    originX: x + width / 2,
                    originY: y + height / 2,
                },
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
                x,
                y,
                width,
                height,
                fill: Colors.red500,
                transform: {
                    rotation,
                    originX: x + width / 2,
                    originY: y + height / 2,
                },
            };
        },
        applyScale: applyRectScale,
        getPropsInCircle: getRectPropsInCircle,
    },
    {
        name: 'Triangle',
        Component: Polygon,
        getProps: (viewRect, shouldRandomize = true) => {
            const scale = shouldRandomize ? getRandom() : FIGURE_INITIAL_SCALE;
            const width = viewRect.width * scale;
            const height = viewRect.width * scale;
            const x = calcCenter(viewRect.width, width);
            const y = calcCenter(viewRect.height, height);
            const rotation = shouldRandomize ? getRandom(0, 90) : 0;
            return {
                x,
                y,
                width,
                height,
                fill: Colors.orange600,
                points: [width / 2, 0, width, height, 0, height],
                transform: {
                    rotation,
                    originX: width / 2,
                    originY: height / 2,
                },
            };
        },
        applyScale: applyRectScale,
        getPropsInCircle: (circleProps, figureProps, { playSucces, playFail }) => {
            const { width, height, transform: oldTransform } = figureProps;
            const d = circleProps.r * 2;
            const diagonal = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
            if (diagonal <= d) {
                const x = circleProps.cx - width / 2;
                const y = circleProps.cy - height / 2;
                const transform = {
                    ...oldTransform,
                    originX: width / 2,
                    originY: height / 2,
                };
                playSucces();
                return { ...figureProps, x, y, transform };
            }
            playFail();
            return figureProps;
        },
    },
    {
        name: 'Star',
        Component: Polygon,
        getProps: (viewRect, shouldRandomize = true) => {
            const scale = shouldRandomize ? getRandom() : FIGURE_INITIAL_SCALE;
            const width = viewRect.width * scale;
            const height = viewRect.width * scale;
            const x = calcCenter(viewRect.width, width);
            const y = calcCenter(viewRect.height, height);
            const cx = width / 2;
            const cy = height / 2;
            const rotation = shouldRandomize ? getRandom(0, 90) : 0;
            return {
                x,
                y,
                width,
                height,
                fill: Colors.cyan500,
                points: calcStarPoints(cx, cy, 5, width * 0.3, width * 0.5),
                transform: {
                    rotation,
                    originX: cx,
                    originY: cy,
                },
            };
        },
        applyScale: applyRectScale,
        getPropsInCircle: getPolygonPropsInCircle,
    },
    {
        name: 'Pentagon',
        Component: Polygon,
        getProps: (viewRect, shouldRandomize = true) => {
            const scale = shouldRandomize ? getRandom() : FIGURE_INITIAL_SCALE;
            const width = viewRect.width * scale;
            const height = viewRect.width * scale;
            const x = calcCenter(viewRect.width, width);
            const y = calcCenter(viewRect.height, height);
            const cx = width / 2;
            const cy = height / 2;
            const rotation = shouldRandomize ? getRandom(0, 90) : 0;
            return {
                x,
                y,
                width,
                height,
                fill: Colors.blueGrey400,
                points: calcStarPoints(cx, cy, 5, width * 0.4, width * 0.5),
                transform: {
                    rotation,
                    originX: cx,
                    originY: cy,
                },
            };
        },
        applyScale: applyRectScale,
        getPropsInCircle: getPolygonPropsInCircle,
    },
    {
        name: 'Sun',
        Component: Polygon,
        getProps: (viewRect, shouldRandomize = true) => {
            const scale = shouldRandomize ? getRandom() : FIGURE_INITIAL_SCALE;
            const width = viewRect.width * scale;
            const height = viewRect.width * scale;
            const x = calcCenter(viewRect.width, width);
            const y = calcCenter(viewRect.height, height);
            const cx = width / 2;
            const cy = height / 2;
            const rotation = shouldRandomize ? getRandom(0, 90) : 0;
            return {
                x,
                y,
                width,
                height,
                fill: Colors.amber500,
                points: calcStarPoints(cx, cy, 20, width * 0.4, width * 0.5),
                transform: {
                    rotation,
                    originX: cx,
                    originY: cy,
                },
            };
        },
        applyScale: applyRectScale,
        getPropsInCircle: getPolygonPropsInCircle,
    },
];

export default figures;
