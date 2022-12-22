import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#E5FAFF",
        borderRadius: 15,
        width: 350,
        margin: 10,
        padding: 20
    },
    authorContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        marginTop: 10 
    },
    interactionContainer: {
        flexDirection: "row"
    },
    titleText: {
        fontSize: 18,
        fontWeight: "bold"
    },
    authorText: {
        fontWeight: "bold"
    },
    dateText: {
        color: "#808080"
    },
    bodyText: {
        marginBottom: 10
    }
});

export default styles;