import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: "#E5FAFF",
        height: "40%",
        marginTop: "130%",
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
    titleInput: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 5,
        fontSize: 20,
        fontWeight: "bold"
    },
    messageInput: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 5,
        marginBottom: 5,
        fontSize: 16,
        paddingBottom: 5,
        height: "70%"
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
});

export default styles;