import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { myTasks, setTaskStatus } from '../services/api';

export default function TasksScreen(){
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  async function load(){ setItems(await myTasks(token)); }
  useEffect(()=>{ load(); }, []);
  return (
    <View style={{ padding:16 }}>
      <Text style={{ fontWeight:'bold', marginBottom:8 }}>My Tasks</Text>
      <FlatList
        data={items}
        keyExtractor={it=>String(it.id)}
        renderItem={({item})=>(
          <View style={{ marginBottom:8 }}>
            <Text>#{item.id} - order:{item.order_id} - {item.specialist_role} - {item.status}</Text>
            <View style={{ flexDirection:'row', gap:8 }}>
              <Button title="IN_PROGRESS" onPress={async()=>{ await setTaskStatus(token,item.id,'in_progress'); load(); }} />
              <Button title="DONE" onPress={async()=>{ await setTaskStatus(token,item.id,'done'); load(); }} />
            </View>
          </View>
        )}
      />
    </View>
  );
}
