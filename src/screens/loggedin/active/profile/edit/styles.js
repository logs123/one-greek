import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF"
    },
    socialContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    buttonContainer: {
        paddingTop: 15
    },
    infoContainer: {
        width: 360
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        paddingBottom: 15
    },
    socialInput: {
        borderColor: "#808080",
        borderRadius: 2.5,
        borderWidth: 0.5,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomWidth: 0.25,
        padding: 5,
        width: 200,
        fontSize: 20,
    },
    saveButton: {
        backgroundColor: "#72AEBC",
        width: 350,
        height: 40,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
    saveButtonText: {
        color: "#FFFFFF",
        fontSize: 20
    }
});

export default styles;