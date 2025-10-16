import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { apiPost, apiGet, setToken } from './api';

export default function App(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [me,setMe]=useState(null);
  const [title,setTitle]=useState('');
  const [detail,setDetail]=useState('');
  const [requests,setRequests]=useState([]);

  const login = async () => {
    const res = await apiPost('/auth/login', { email, password });
    if(res.token){ setToken(res.token); setMe(res.user); loadRequests(); }
    else alert('Login failed');
  };

  const createReq = async () => {
    const res = await apiPost('/requests', { serviceCode:'TRANSCRIPTION', title, detail, priority:2 });
    if(res.RequestId){
      await apiPost(`/requests/${res.RequestId}/assign`);
      loadRequests();
    }
  };

  const loadRequests = async () => {
    const res = await apiGet('/requests'); setRequests(res||[]);
  };

  return (
    <View style={{padding:16, marginTop: 40}}>
      {!me && (<>
        <Text>Đăng nhập</Text>
        <TextInput placeholder="Email" onChangeText={setEmail} style={{borderWidth:1, marginVertical:8, padding:8}}/>
        <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} style={{borderWidth:1, marginVertical:8, padding:8}}/>
        <Button title="Login" onPress={login}/>
      </>)}
      {me && (<>
        <Text>Xin chào {me.name} - {me.role}</Text>
        <Text style={{marginTop:12}}>Tạo yêu cầu</Text>
        <TextInput placeholder="Tiêu đề" onChangeText={setTitle} style={{borderWidth:1, marginVertical:8, padding:8}}/>
        <TextInput placeholder="Chi tiết" onChangeText={setDetail} style={{borderWidth:1, marginVertical:8, padding:8}}/>
        <Button title="Tạo + Gán" onPress={createReq}/>
        <Text style={{marginTop:16}}>Yêu cầu của tôi</Text>
        <FlatList
          data={requests}
          keyExtractor={i => String(i.RequestId)}
          renderItem={({item}) => <Text>#{item.RequestId} [{item.ServiceCode}] {item.Title} - {item.Status}</Text>}
        />
      </>)}
    </View>
  );
}
