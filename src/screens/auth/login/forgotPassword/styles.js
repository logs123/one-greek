import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF"
    },
    titleText: {
        color: "#72AEBC",
        fontFamily: "HelveticaNeue-Medium",
        fontSize: 24
    },
    emailInput: {
        borderColor: "#808080",
        borderRadius: 2.5,
        borderWidth: 0.5,
        padding: 10,
        width: 350,
        fontSize: 20,
        marginTop: 10
    },
    resetButton: {
        backgroundColor: "#72AEBC",
        width: 350,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10
    },
    resetButtonText: {
        color: "#FFFFFF",
        fontSize: 20
    }
})

export default styles;