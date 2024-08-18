import React, { useEffect, useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableHighlight,Dimensions } from 'react-native';


const deviceHight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width


const Hookpage = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => { setModalVisible(true) }, [])

    const hideAlert = () => {
        setModalVisible(false);
    };

    const handleYes = () => {
        // Handle logic for 'Yes' button press
        console.log('Yes Pressed');
        hideAlert();
        navigation.navigate("Animation")
    };

    const handleNo = () => {
        // Handle logic for 'No' button press
        console.log('No Pressed');
        hideAlert();
    };

    return (
        <View style={{flex:1,backgroundColor:"#303030",height:deviceHight}}>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={hideAlert}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ fontWeight: '400', fontSize: 14 }}>Do you prefer sign language?</Text>

                        <View style={styles.buttonContainer}>
                            <TouchableHighlight
                                style={{
                                    marginHorizontal: 10,
                                    borderWidth: 1,
                                    borderRadius: 20,
                                    borderColor: "#0274C6",
                                    width: 80,
                                    height: 38,
                                }}
                                onPress={handleYes}
                            >
                                <Text style={{
                                    color: '#0274C6',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    marginVertical: 7
                                }}>Yes</Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={{
                                    marginHorizontal: 10,
                                    borderWidth: 1,
                                    borderRadius: 20,
                                    borderColor: "#0274C6",
                                    width: 80,
                                    height: 38,
                                }}
                                onPress={handleNo}
                            >
                                <Text style={{
                                    color: '#0274C6',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    marginVertical: 7
                                }}>No</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor:"#303030",
        height:deviceHight
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        elevation: 5,
        width: 311,
        height: 172
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    button: {
        marginHorizontal: 10,
        borderRadius: 5,
        padding: 10,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Hookpage;
