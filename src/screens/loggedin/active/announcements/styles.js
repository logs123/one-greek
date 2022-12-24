import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF"
    },
    composeButton: {
        backgroundColor: "#C3F4FF",
        bottom: 15,
        right: 15,
        position: "absolute",
        zIndex: 9999,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 72,
        height: 72,
        width: 72
    }
});

export default styles;