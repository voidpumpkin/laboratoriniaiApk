import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as SQLite from 'expo-sqlite';
import * as Location from 'expo-location';

const DEFAULT_LOCATION = {
    latitude: 54.722474,
    longitude: 25.33769,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
};

const db = SQLite.openDatabase('db.db');

const Lab9 = () => {
    const [location, setLocation] = useState(undefined);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setLocation(null);
            }

            const { coords } = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = coords;
            setLocation({ ...DEFAULT_LOCATION, latitude, longitude });
        })();
    }, []);

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                'create table if not exists markers (id integer primary key not null, latitude float, longitude float);'
            );
        });
        db.transaction((tx) => {
            tx.executeSql(`select * from markers`, [], (_, { rows: { _array } }) => {
                setMarkers(_array);
            });
        });
    }, []);

    const handlePress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        if (
            markers.find(
                (coordinate) =>
                    coordinate.latitude === latitude && coordinate.longitude === longitude
            )
        ) {
            return;
        }
        db.transaction((tx) => {
            tx.executeSql('insert into markers (latitude, longitude) values (?, ?)', [
                latitude,
                longitude,
            ]);
            tx.executeSql('select * from markers', [], (_, { rows: { _array } }) =>
                setMarkers(_array)
            );
        });
    };

    const handleMarkerPress = (event) => {
        const { coordinate } = event.nativeEvent;
        const { id } = markers.find(
            ({ latitude, longitude }) =>
                coordinate.latitude === latitude && coordinate.longitude === longitude
        );
        db.transaction((tx) => {
            tx.executeSql(`delete from markers where id = ?;`, [id]);
            tx.executeSql('select * from markers', [], (_, { rows: { _array } }) => {
                setMarkers(_array);
            });
        });
    };

    return (
        (location || location === null) && (
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={location || DEFAULT_LOCATION}
                onPress={handlePress}
                onMarkerPress={handleMarkerPress}
            >
                {markers.map(({ latitude, longitude, id }) => (
                    <Marker coordinate={{ latitude, longitude }} key={id} />
                ))}
            </MapView>
        )
    );
};

export default Lab9;

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
