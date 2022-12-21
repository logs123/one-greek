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
        justifyContent: "space-between"
    },
    authorText: {
        fontWeight: "bold"
    },
    dateText: {
        color: "#808080"
    },
    bodyText: {
        marginTop: 15
    }
})

export default styles;