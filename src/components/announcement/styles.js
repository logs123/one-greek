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
        flexDirection: "row",
        justifyContent: "space-between"
    },
    creatorInteractionContainer: {
        flexDirection: "row"
    },
    defaultInteractionContainer: {
        flexDirection: "row",
        marginRight: 25
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
    },
    editText: {
        backgroundColor: "#FFFFFF"
    },
    link: {
        color: '#2980b9',
        textDecorationLine: "underline"
    }
});

export default styles;