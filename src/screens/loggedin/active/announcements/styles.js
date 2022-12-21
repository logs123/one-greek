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
        bottom: 25,
        right: 25,
        position: "absolute",
        zIndex: 9999,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 72,
        height: 72,
        width: 72
    },
    modalContainer: {
        backgroundColor: "#E5FAFF",
        height: "50%",
        marginTop: "110%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    topModalContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30
    },
    bottomModalContainer: {
        borderTopWidth: 0.75,
        borderTopColor: "#808080"
    },
    userModalInfo: {
        fontWeight: "bold"
    },
    postInput: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 5,
        fontSize: 16
    },
    postButton: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    postButtonText: {
        fontSize: 20,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10
    }
})

export default styles;