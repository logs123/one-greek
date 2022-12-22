import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        justifyContent: "center"
    },
    titleText: {
        color: "#72AEBC",
        fontFamily: "HelveticaNeue-Medium",
        fontSize: 24,
        textAlign: "center",
        marginBottom: 10
    },
    bodyText: {
        color: "#808080",
        marginBottom: 20,
        marginTop: 5
    },
    inputContainer: {
        flexDirection: "row"
    },
    input: {
        borderColor: "#808080",
        borderRadius: 5,
        borderWidth: 0.5,
        margin: 10,
        padding: 10,
        width: 350,
        fontSize: 20
    }
});

export default styles;