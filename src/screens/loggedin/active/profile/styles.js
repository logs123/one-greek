import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF"
    },
    topContainer: {
        margin: 30
    },
    profileContainer: {
        flexDirection: "row",
        backgroundColor: "#cccccc"
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold"
    },
    nameText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    logoutButton: {
        backgroundColor: "#72AEBC",
        width: 350,
        height: 40,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    logoutButtonText: {
        color: "#FFFFFF",
        fontSize: 20
    }
});

export default styles;