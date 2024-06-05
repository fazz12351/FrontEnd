import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <View>
            <Text style={style.clock}>
                Current Time: {time.toLocaleTimeString()}
            </Text>
        </View>
    );
}

const style = StyleSheet.create({
    clock: {
        fontSize: 15,
        paddingBottom: 10
    }

})

export default Clock;
