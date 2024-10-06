const isFollowing = async (viewersPublicKey: string, followingPublicKey: string) => {

    const url = "https://desonode.rylees.net/api/v0/is-following-public-key"
    const data = {
        PublicKeyBase58Check: viewersPublicKey,
        IsFollowingPublicKeyBase58Check: followingPublicKey,
    }

    const params = {
        method:'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json'}
    }

    if (!viewersPublicKey) { 
        
        return;
    
    } else{

        try {
            const res = await fetch(url, params)
            const result = await res.json()   
            return {...result}      
        } catch (error) {
            return {error} 
        }
}

}

export default isFollowing