import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#FFFFFF"
    },
    centerContainer: {
        alignItems: "center",
        flexGrow: 0.5
    },
    image: {
        height: 150,
        width: 150,
        marginTop: 50,
        marginBottom: 50
    },
    emailInput: {
        borderColor: "#808080",
        borderRadius: 2.5,
        borderWidth: 0.5,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomWidth: 0.25,
        padding: 10,
        width: 350,
        fontSize: 20,
    },
    passwordInput: {
        borderColor: "#808080",
        borderRadius: 2.5,
        borderWidth: 0.5,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderTopWidth: 0.25,
        padding: 10,
        width: 350,
        fontSize: 20
    },
    loginButton: {
        backgroundColor: "#72AEBC",
        width: 350,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10
    },
    loginButtonText: {
        color: "#FFFFFF",
        fontSize: 20
    }
});

export default styles;