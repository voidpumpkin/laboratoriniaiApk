import React, { useState } from 'react';
import { Menu } from 'react-native-paper';

const ViewMenu = ({ anchor, onItemPress, style, items, openOnClick = true }) => {
    const [state, setState] = useState({ x: 0, y: 0, isVisible: false });

    return (
        <Menu
            visible={state.isVisible}
            onDismiss={() => setState({ ...state, isVisible: false })}
            anchor={anchor({
                style: style,
                onPress: (event) =>
                    setState({
                        x: event.nativeEvent.pageX,
                        y: event.nativeEvent.pageY,
                        isVisible: true,
                    }),
            })}
            style={
                openOnClick && {
                    position: 'absolute',
                    top: state.y,
                    left: state.x,
                }
            }
        >
            {items.map((item, i) => (
                <Menu.Item
                    key={i}
                    onPress={() => {
                        setState({ ...state, isVisible: false });
                        onItemPress(i);
                    }}
                    title={item}
                />
            ))}
        </Menu>
    );
};

export default ViewMenu;
