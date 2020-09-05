import React from 'react';
import { Appbar } from 'react-native-paper';
import { NAVIGATIONS } from './constants';
import Lab6HeaderItems from './lab6/Lab6HeaderItems';

const { BackAction, Content } = Appbar;

const Header = ({ scene, previous, navigation }) => {
    const { headerTitle, title, headerStyle } = scene.descriptor.options;
    const isLab6 = scene.route.name === NAVIGATIONS.LAB6;

    return (
        <Appbar.Header style={headerStyle}>
            {previous && <BackAction onPress={navigation.goBack} />}
            <Content title={headerTitle || title || scene.route.name} />
            {isLab6 && <Lab6HeaderItems />}
        </Appbar.Header>
    );
};

export default Header;
