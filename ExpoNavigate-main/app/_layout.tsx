import {Stack} from 'expo-router'

export default function StackLayout()
{
    return(
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='(user)/cadastro' options={{headerTitle : 'Cadastro'}} />
            <Stack.Screen name='(home)'  options={{ headerShown: false }} />
        </Stack>
    )
}