import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#E5FAFF",
    },
    headerButtonContainer: {
        marginRight: 10,
    },
    hiddenContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0)"
    },
    modalSelectionContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    modal: {
        position: "absolute",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10
    },
    line: {
        height: 1,
        backgroundColor: 'gray',
        marginVertical: 10
    },
    createText: {
        fontSize: 16
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    deleteButtonText: {
        color: 'white'
    },
    messagePreview: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#B2F1FF",
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    searchBarContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "#B2F1FF",
        padding: 10
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        backgroundColor: "#C3F4FF",
        borderRadius: 90
    },
    searchBarInput: {
        paddingLeft: 10,
        paddingRight: 200,
        paddingVertical: 5
    }
});

export default styles;