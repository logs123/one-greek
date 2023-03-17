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
        paddingTop: 10,
        flexDirection: "row"
    },
    textContainer: {
        width: 250,
        paddingLeft: 20
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold"
    },
    nameText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    chapterText: {
        fontSize: 16,
        paddingTop: 5,
        paddingBottom: 5,
        fontStyle: "italic",
        paddingLeft: 1
    },
    editButton: {
        backgroundColor: "#D2F7FF",
        alignSelf: "stretch",
        justifyContent: "center",
        height: 30,
        borderRadius: 30
    },
    editButtonText: {
        color: "#72AEBC",
        fontSize: 16,
        alignSelf: "center"
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
    },
    changePic: {
        position: "absolute",
        left: 55,
        top: 55,
        backgroundColor: "#D2F7FF",
        borderRadius: 55,
        padding: 2
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 80
    }
});

export default styles;