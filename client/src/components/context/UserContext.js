import React, {useState} from 'react';

const UserContext = React.createContext([{}, () => {}]);

function UserContextProvider(props) {
    const initialUserState = {id: 0,
                              first_name: "Default",
                              last_name: "Default",
                              type: "",
                              loginTime: ""}
    let userCookie = JSON.parse(localStorage.getItem("user"))
    const [user, setUser] = useState(userCookie ? userCookie : 
                                        initialUserState);
    function clearUser() {
        localStorage.clear("user");
        setUser(initialUserState);
    }

    return (
        <UserContext.Provider value={[user, setUser, clearUser]}>
            {props.children}
        </UserContext.Provider>
    );
}

export { UserContext, UserContextProvider};