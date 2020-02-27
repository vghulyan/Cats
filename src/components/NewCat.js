import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    AsyncStorage
} from 'react-native';

import { useDispatch } from 'react-redux';
import { useHeaderHeight } from 'react-navigation-stack';

import {addCat, updateCat} from "../actions/actions";


const MAX_LENGTH = 250;

export default function NewCat(props) {
    const dispatch = useDispatch();
    const {navigation} = props;

    let cat = navigation.getParam('cat', null);

    //1 - DECLARE VARIABLES
    const [isSaving, setIsSaving] = useState(false);
    const [name, setName] = useState(cat ? cat.name : "");
    const [description, setDescription] = useState(cat ? cat.description : "");

    //==================================================================================================

    //2 - GET FLATLIST DATA
    const onSave = () => {
        let edit = cat !== null;
        let cat_ = {};

        if (edit) {
            cat_ = cat;
            cat_['name'] = name;
            cat_['description'] = description;
        } else {
            let id = generateID();
            cat_ = {"id": id, "name": name, "description": description};
        }

        //OPTION 1 - ADD TO LOCAL STORAGE DATA
        AsyncStorage.getItem('cats', (err, cats) => {
            if (err) alert(err.message);
            else if (cats !== null){
                cats = JSON.parse(cats);

                if (!edit){
                    //add the new cat to the top
                    cats.unshift(cat_);
                }else{
                    //find the index of the cat with the cat id
                    const index = cats.findIndex((obj) => obj.id === cat_.id);

                    //if the cat is in the array, replace the cat
                    if (index !== -1) cats[index] = cat_;
                }

                //Update the local storage
                AsyncStorage.setItem('cats', JSON.stringify(cats), () => {
                    if (!edit) dispatch(addCat(cat_));
                    else dispatch(updateCat(cat_));

                    navigation.goBack();
                });
            }
        });

        //OPTION 2 - FAKE API
        // let url = "https://my-json-server.vardan_ghulyan.com/cats";
        // axios.post(url, cat_)
        //     .then(res => res.data)
        //     .then((data) => {
        //         dispatch(cat ? updateCat(data) : addCat(data));
        //         navigation.goBack();
        //     })
        //     .catch(error => alert(error.message))
    };

    //==================================================================================================

    //3 - GENERATE ID
    const generateID = () => {
        let d = new Date().getTime();
        let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(5);
        });

        return id;
    };

    //==================================================================================================

    //4 - RENDER
    let disabled = (name.length > 0 && description.length > 0) ? false : true;
    return (
        <KeyboardAvoidingView keyboardVerticalOffset={useHeaderHeight()} style={styles.flex} behavior="padding">
            <SafeAreaView style={styles.flex}>
                <View style={styles.flex}>
                    <TextInput
                        onChangeText={(name) => setName(name)}
                        placeholder={"Name"}
                        autoFocus={true}
                        style={[styles.name]}
                        value={name}/>
                    <TextInput
                        multiline={true}
                        onChangeText={(description) => setDescription(description)}
                        placeholder={"Please describe your cat!!!"}
                        style={[styles.description]}
                        maxLength={MAX_LENGTH}
                        value={description}/>
                </View>

                <View style={styles.buttonContainer}>
                    <View style={{flex: 1, justifyContent: "center"}}>
                        <Text style={[styles.count, (MAX_LENGTH - description.length <= 10) && {color: "red"}]}> {MAX_LENGTH - description.length}</Text>
                    </View>
                    <View style={{flex: 1, alignItems: "flex-end"}}>
                        <TouchableHighlight style={[styles.button]} disabled={disabled} onPress={onSave}
                                            underlayColor="rgba(0, 0, 0, 0)">
                            <Text style={[styles.buttonText, {color: disabled ? "rgba(255,255,255,.5)" : "#FFF"}]}>
                                Save
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    flex: {
        flex: 1
    },

    buttonContainer: {
        height: 70,
        flexDirection: "row",
        padding: 12,
        backgroundColor: "white"
    },

    count: {
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 17,
        color: "#6B9EFA"
    },

    button: {
        width: 80,
        height: 44,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#6B9EFA"
    },

    buttonText: {
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 16,
    },

    name: {
        fontSize: 20,
        lineHeight: 22,
        fontFamily: 'Helvetica Neue',
        height: 80,
        padding: 16,
        backgroundColor: 'white',
    },

    description: {
        fontSize: 30,
        lineHeight: 33,
        fontFamily: 'Helvetica Neue',
        color: "#333333",
        padding: 16,
        paddingTop: 16,
        minHeight: 170,
        borderTopWidth: 1,
        borderColor: "rgba(212,211,211, 0.3)"
    }
});
