import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useAuth } from '../auth/AuthContext';

export default function LoginScreen(){
  const { login } = useAuth();
  const [email, setEmail] = useState('c1@mp.com');
  const [password, setPassword] = useState('123456');

  return (
    <View style={{ padding:16 }}>
      <Text style={{ fontSize:24, fontWeight:'bold', marginBottom:8 }}>MuTraPro (Mobile)</Text>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" style={{ borderWidth:1, padding:8, marginBottom:8 }} />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth:1, padding:8, marginBottom:16 }} />
      <Button title="Login" onPress={async ()=>{
        const ok = await login(email, password);
        if(!ok) Alert.alert('Login failed');
      }} />
    </View>
  );
}
