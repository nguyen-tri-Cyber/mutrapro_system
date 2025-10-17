import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { createOrder, listOrders } from '../services/api';

export default function OrdersScreen(){
  const { token, user } = useAuth();
  const [svc, setSvc] = useState('recording');
  const [desc, setDesc] = useState('Thu âm demo');
  const [items, setItems] = useState([]);

  async function load(){ setItems(await listOrders(token)); }
  useEffect(()=>{ load(); }, []);

  return (
    <View style={{ padding:16 }}>
      {user?.role==='customer' && (
        <View style={{ marginBottom:16 }}>
          <Text style={{ fontWeight:'bold' }}>Create Order</Text>
          <Text>Service: (transcription | arrangement | recording)</Text>
          <TextInput value={svc} onChangeText={setSvc} style={{ borderWidth:1, padding:8, marginBottom:8 }} />
          <Text>Description</Text>
          <TextInput value={desc} onChangeText={setDesc} style={{ borderWidth:1, padding:8, marginBottom:8 }} />
          <Button title="Create" onPress={async()=>{ await createOrder(token, svc, desc, 0); load(); }} />
        </View>
      )}
      <Text style={{ fontWeight:'bold', marginBottom:8 }}>Orders</Text>
      <FlatList
        data={items}
        keyExtractor={it=>String(it.id)}
        renderItem={({item})=>(<Text>#{item.id} [{item.service_type}] - {item.status}</Text>)}
      />
    </View>
  );
}
