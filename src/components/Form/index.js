import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, Vibration, Pressable, Keyboard} from "react-native"
import styles from "./style";
import ResultImc from "./ResultImc/";

export default function Form(){

const [height, setHeight] = useState(null)
const [weight, setWeight] = useState(null)
const [messageImc, setMessageImc]= useState("preencha o peso e altura");
const [imc, setImc]= useState(null)
const [textButton, setTextButton]= useState("Calcular")
const [errorMessage, setErrorMesage] = useState(null)

function imcCalculator(){
    let heightFormat = height.replace(",",".")
    return setImc((weight/ (heightFormat * heightFormat)).toFixed(2))
}
 function verificationImc(){
    if(imc == null){
        Vibration.vibrate();
        setErrorMesage("campo obrigatório*")
    }
 }   

function validationImc(){
    if(weight != null && height != null){
        imcCalculator()
        setHeight(null)
        setWeight(null)
        setMessageImc("Seu imc é igual:")
        setTextButton("Calcular Novamente")
        setErrorMesage(null)
        return
    }
    verificationImc()
    setImc(null)
    setTextButton("Calcular")
    setMessageImc("preencha o peso e altura")
    
}

    return(
        <Pressable onPress={Keyboard.dismiss} style={styles.formContext}>
                <View style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                style={styles.input}
                onChangeText={setHeight}
                value={height}
                placeholder="Ex. 1.75"
                keyboardType="numeric"
                />

                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                style={styles.input}
                onChangeText={setWeight}
                value={weight}
                placeholder="Ex. 75.365"
                keyboardType="numeric"
                />
                <TouchableOpacity 
                style={styles.buttonCalculator}
                onPress={() =>{ 
                validationImc()
                }}
                >
                <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
                </View>
                <ResultImc messageResultImc={messageImc} resultImc={imc}/>
        </Pressable>
    );
}