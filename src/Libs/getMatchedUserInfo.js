const getMatchedUserInfo  = ( users, userLoggedIn ) => {
    const newUsers = { ...users };
    delete newUsers[userLoggedIn];

    const [uid, user] = Object.entries(newUsers).flat();

    return{ uid, ...user }
}

export default getMatchedUserInfo;