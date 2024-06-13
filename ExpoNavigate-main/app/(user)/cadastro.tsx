import { Input, Icon } from 'react-native-elements'
import { Pressable, StyleSheet, Text, View, Image, Alert,  } from 'react-native'
import { useEffect, useState } from 'react'
import { apiConfig } from '@/utils/api'
import { router, useRouter } from 'expo-router'

export default function CadastroUsuario()
{
    const [passwordVisible, SetPasswordVisible] = useState(true)

    const [nome, setNome] = useState('some_name')
    const [email, setEmail] = useState('some@email.com')
    const [password, setPassword] = useState('1234567890')
    const [confirmPassword, setConfirmPassword] = useState('1234567890')

    const [errorNome, setErrorNome] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('')
    
    useEffect(() => {
        if(!email.trim().includes('@') || email == "" || email == null)
            setErrorEmail('Insira um email valido!')
        else
            setErrorEmail('')
        
        if(password.length < 10 || password.length > 10 || password == "" || password == null)
            setErrorPassword('Senha invalida!')
        else
            setErrorPassword('')

        if(nome == "" || nome == null)
            setErrorNome('Nome invalido')
        else
            setErrorNome('')

        if(confirmPassword != password)
        {
            setErrorConfirmPassword('As senhas não coincidem')
        }
        else
            setErrorConfirmPassword('')
        
    }, [nome, email, password, confirmPassword]);

        async function storeUser(){
        if(
            email != '@' &&
            password != '_password_'
        )
        {
            try{
                let res = await apiConfig.post('/user/novo',{
                    email: email,
                    senha: password,
                })

                if(res.status == 200)
                {
                    return Alert.alert('Ok','Usuario cadastrado!',
                    [
                        {
                            text: 'Ok',
                            onPress: ()=> router.dismiss(1)
                        }
                    ])
                }
                else
                {
                    return Alert.alert('Ops...','Email ja cadastrado!',
                    [
                        {
                            text: 'Ok',
                        }
                    ])  
                }
            }
            catch(error){

            }
        }
    }


    return (
        <View style={estilo.tela}>
            <Image
                    style={estilo.imagem}
                    source={require('../../assets/images/LogoPreparaVest.png')}
                    resizeMode="stretch"
                />
            <View style={estilo.formulario}>
                <Text style={estilo.texto}>Cadastro</Text>
                <Input
                    style={estilo.text_input} 
                    label="Nome"
                    placeholder='Digite seu nome...'
                    onChangeText={text => setNome(text)}
                    inputContainerStyle={
                        errorNome == '' ?
                        estilo.input_container
                        :
                        estilo.input_container_error
                    }
                    errorMessage={errorNome}
                    leftIcon={
                        <Icon 
                            name='person'
                            type='material'
                        />
                    }
                />
                <Input 
                    style={estilo.text_input} 
                    label="Email"
                    placeholder='Digite seu email...'
                    errorMessage={errorEmail}
                    onChangeText={text => setEmail(text)}
                    inputContainerStyle={
                        errorEmail == '' ?
                        estilo.input_container
                        :
                        estilo.input_container_error
                    }
                    leftIcon={
                        <Icon 
                            name='mail'
                            type='material'
                        />
                    }
                />
                <Input
                    style={estilo.text_input} 
                    label="Senha"
                    placeholder='Deve ter 10 caracteres...'
                    maxLength={10}
                    onChangeText={text => setPassword(text)}
                    inputContainerStyle={
                        errorPassword == '' ?
                        estilo.input_container
                        :
                        estilo.input_container_error
                    }
                    secureTextEntry={passwordVisible}
                    errorMessage={errorPassword}
                    leftIcon={
                        <Icon 
                            name='password'
                            type='material'
                        />
                    }
                    rightIcon={
                        passwordVisible ? 
                        <Icon 
                            name="visibility-off"
                            type="material"
                            size={22}
                            onPress={()=> SetPasswordVisible(!passwordVisible)}
                        />
                        :
                        <Icon 
                            name="visibility"
                            type="material"
                            size={22}
                            onPress={()=> SetPasswordVisible(!passwordVisible)}
                        />
                    }  
                />
                <Input 
                    style={estilo.text_input}
                    label="Confirme a senha"
                    placeholder='Repita a senha...'
                    errorMessage={errorConfirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                    inputContainerStyle={
                        errorConfirmPassword == '' ?
                        estilo.input_container
                        :
                        estilo.input_container_error
                    }
                    maxLength={10}
                    secureTextEntry={passwordVisible}
                    leftIcon={
                        <Icon 
                            name='password'
                            type='material'
                        />
                    }
                    rightIcon={
                        passwordVisible ? 
                        <Icon 
                            name="visibility-off"
                            type="material"
                            size={22}
                            onPress={()=> SetPasswordVisible(!passwordVisible)}
                        />
                        :
                        <Icon 
                            name="visibility"
                            type="material"
                            size={22}
                            onPress={()=> SetPasswordVisible(!passwordVisible)}
                        />
                    }  
                />
                <Pressable style={ estilo.botoes } onPress={()=> storeUser()}>
                    <Text style={estilo.texto_botoes}>Confirmar</Text>
                </Pressable>
            </View>
        </View>
    )
}

const estilo = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor:"#38B6FF",
        alignItems: 'center',
        justifyContent: 'center',
      },
      formulario: {
        height:500,
        width:400,
        backgroundColor: "#FCFCFC",
        borderRadius: 10,
        justifyContent: "center",
        padding: 2,
        fontFamily: 'Kollektif'
    
      },
      imagem: {
        width: 500,
        height: 250,
        margin: -50
      },
      texto: {
        textAlign: 'center',
        color: "#000",
        fontSize: 40,
      },
      text_input: {
        backgroundColor: "#ECECEC",
        height: 50,
        width: 300,
        margin: 12,
        borderRadius: 10,
        padding:20,
        color: '#797976',
        fontSize: 18,
        
      },
    input_container : {
        borderWidth: 0
    },
    input_container_error: {
        borderWidth: 2, 
        borderColor: 'red', 
        borderRadius: 16, 
        padding: 10,
        marginTop: 10
    },
    botoes : {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#4776DF',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    disable : {
        opacity: 0.2
    },
    texto_botoes : {
        color: 'white',
        fontSize: 20
    }
})