import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RNBootSplash from "react-native-bootsplash";

import AppNavigator from './app/navigation/AppNavigator';
import OfflineNotice from './app/components/OfflineNotice';
import AuthNavigator from './app/navigation/AuthNavigator';
import AuthContext from './app/auth/context';
import authStorage from './app/auth/storage';
import { requestUserPermission, notificationListener } from './app/utility/notification';

function App(props) {
  const [user, setUser] = useState();

  const restoreUser=async()=>{
    const user = await authStorage.getUser();
    if (user) return setUser(user);
  }

  useEffect(()=>{
    requestUserPermission()
    notificationListener()
    restoreUser()
    setTimeout(() => {
      RNBootSplash.hide()
    }, 1500);
  }, [])

  return( 
    <AuthContext.Provider value={{user, setUser}}>
     <OfflineNotice />
     <NavigationContainer>
       {user ? <AppNavigator/> : <AuthNavigator/>}
     </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default App;