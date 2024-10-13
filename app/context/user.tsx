"use client"

import { useRouter } from "next/navigation";
import { Profile, UserContextTypes, State, Follows } from "../types";
import { useState, useEffect, useRef, createContext, ReactNode, useContext } from "react";
import { getSingleProfile, createSubmitPostTransaction, avatarUrl, timestampToDate } from '@/app/deso/deso-api';
import { StoredUser, configure, identity, SubscriberNotification } from "deso-protocol";
import getProfile from "../deso/hooks/GetProfile";
import getFollowers from "../deso/hooks/GetFollowers";
import getFollows from "../deso/hooks/GetFollowing";
import getFollowing from "../deso/hooks/GetFollowing";


const UserContex = createContext<UserContextTypes | null>(null);

const UserProvider: React.FC<{ children: ReactNode }> = ( { children }) => {

    const router = useRouter()
    const [loggedin, setLoggedIn] = useState<boolean>(false)
    const [user, setUser] = useState<Profile | null>(null)
    const [followers, setFollowers] = useState<Follows | null>(null)
    const [following, setFollowing] = useState<Follows | null>(null)
    const [authkeys, setAuthkeys] = useState<SubscriberNotification | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const isRunned = useRef(false);
    const [loggedUserPublicKey, setLoggedUserPublicKey] = useState<string | undefined>('');  
  
    const [altLoggedUsers, setAltLoggedUsers] = useState<Record<string, StoredUser> | null>(null)
   
    const APP_NAME = 'DeSoHosting by @ryleesnet'; // aka MEMO for derived keys

    

    const [derivedPublicKeyBase58Check, setDerivedPublicKeyBase58Check ] = useState<String>('')
    const [derivedSeedHex, setDerivedSeedHex] = useState<String>('')

    const handleSwitchUserMenuToggle = () => {
        if (!state.showSwitchUserMenu) {
        setState({ ...state, showSwitchUserMenu: true });
        } else {
        setState({ ...state, showSwitchUserMenu: false });
        }
    };

        
    const [state, setState] = useState<State>({
      loggedUserPublicKey: '',
      loggedUserProfile: null,
      postText: '',
      recentPost: null,
      altLoggedUsers: null,
      showSwitchUserMenu: false,
      loading: false
    });
    

     const checkUser = async () => {
        try {
            identity.subscribe((state) => {
                const { currentUser, alternateUsers, event } = state
            
            switch (event) {
                case 'SUBSCRIBE':
                  // there can be logged user already when app loads
                  //setLoggedUserPublicKey(currentUser?.publicKey)

                  //console.log("update user profile to ", currentUser?.publicKey)
                  //updateLoggedUserProfile(currentUser?.publicKey)
                  
                  //setIsLoggedIn(true)
                  //setAuthkeys(state)
                  if (currentUser) {
                    setIsLoggedIn(true)
                    setAuthkeys(state)
                    getProfile(currentUser?.publicKey, "").then(function(result){
                      setUser(result)
                    })
                   
                   
                  }
                  
        
                  // set list of alternative logged users, so we can switch between them
                  setAltLoggedUsers(alternateUsers)
                  break;    
                case 'LOGIN_START':
                  // 
                  break;      
                case 'LOGIN_END':
                  // 
                  setLoggedUserPublicKey(currentUser?.publicKey)
                  //console.log("update user profile to ", currentUser?.publicKey)
                  
                  getProfile(currentUser?.publicKey, "").then(function(result){
                    setUser(result)
                  })
                  setIsLoggedIn(true)
                  setAuthkeys(state)

                  
        
                  // set list of alternative logged users, so we can switch between them
                  setAltLoggedUsers(alternateUsers)             
                  break;   
                case 'CHANGE_ACTIVE_USER':
                  // 
                  setLoggedUserPublicKey(currentUser?.publicKey)
                  //console.log("update user profile to ", currentUser?.publicKey)
                  {currentUser ? (
                    getProfile(currentUser?.publicKey, "").then(function(result){
                      setUser(result)
                    })
                  ): null}
                  setAuthkeys(state)
        
                  // set list of alternative logged users, so we can switch between them
                  setAltLoggedUsers(alternateUsers)          
                  break;             
                case 'AUTHORIZE_DERIVED_KEY_START':
                  //
                  setAuthkeys(state) 
                  break;   
                case 'AUTHORIZE_DERIVED_KEY_END':
                  //
                  setAuthkeys(state) 
                  break;                                                
                case 'LOGOUT_START':
                  //     
                  break;         
                case 'LOGOUT_END':
                  // 
                  //setLoggedUserPublicKey(currentUser?.publicKey)
                  //updateLoggedUserProfile(currentUser?.publicKey)
                  setIsLoggedIn(false)
                  setUser(null)
        
                  // set list of alternative logged users, so we can switch between them
                  setAltLoggedUsers(alternateUsers)             
                  break;        
                default:
                  //console.log(`Event: ${event}.`);
              } 
      
            })
        } catch (error) {
            setLoggedUserPublicKey('')
            setUser(null)
            setIsLoggedIn(false)
        }
    }
 

    useEffect(() => {
      checkUser() 
    }, []);

    const login = async () => {
            if (isRunned.current) return;
            isRunned.current = true;
      
	    configure({
                spendingLimitOptions: {
                  GlobalDESOLimit: 1 * 1e9, // 1 Deso
                  TransactionCountLimitMap: {
                    BASIC_TRANSFER: 'UNLIMITED',
                    SUBMIT_POST: 'UNLIMITED',
                  },
                  DAOCoinOperationLimitMap: {
                    'BC1YLin6CLZ52Jy7ak9BEjBQVHhSi3wNSVxc31FNeBKVKQsd9QEXTej': {
                      'burn' : 'UNLIMITED'
                    }
                  }
              },
                appName: APP_NAME,
                nodeURI: 'https://desonode.rylees.net',
                });

            
  
        identity.login()
        //await checkUser()

    }

    const logout = async () => {
        await identity.logout()
        router.refresh()
    }
    

    return (
        <UserContex.Provider value={ { user, authkeys, followers, following, login, logout, checkUser}}>
            {children}
        </UserContex.Provider>
    )

}

export default UserProvider;

export const useUser = () => useContext(UserContex)
