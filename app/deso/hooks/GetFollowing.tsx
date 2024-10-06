const getFollowing = async (publicKey: string) => {

    const url = "https://desonode.rylees.net/api/v0/get-follows-stateless"
    const data = {
        PublicKeyBase58Check: publicKey,
        Username: null,
        GetEntriesFollowingUsername: false,
        LastPublicKeyBase58Check: null,
        NumToFetch: null

    }

    const params = {
        method:'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json'}
    }

    try {
        const res = await fetch(url, params)
        const result = await res.json()   
        return {...result}      
    } catch (error) {
        return {error} 
    }

}

export default getFollowing