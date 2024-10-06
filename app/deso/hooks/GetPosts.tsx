import { useUser } from "@/app/context/user"
import { GetPostsResponse, PostEntryResponse } from "@/app/types"
import { getPostsStateless } from "deso-protocol"

const getPosts = async (lastPostHash: string, ReaderPublicKeyBase58Check: string | null) => {
  
    const url = "https://desonode.rylees.net/api/v0/get-posts-stateless"
   
    
    const data = {
        "PostHashHex": lastPostHash,
        "ReaderPublicKeyBase58Check": ReaderPublicKeyBase58Check,
        "OrderBy": "newest",
        "StartTstampSecs": null,
        "PostContent": null,
        "NumToFetch": 300,
        "FetchSubcomments": true,
        "GetPostsForFollowFeed": false,
        "GetPostsForGlobalWhitelist": true,
        "GetPostsByDESO": false,
        "GetPostsByClout": false,
        "MediaRequired": true,
        

    }

    const params = {
        method:'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json'}
    }

    const body = JSON.stringify(data)

    try {
        const res = await fetch(url, params)
        //console.log(await res.json())
        const result: GetPostsResponse = await res.json()
        let filteredResults: PostEntryResponse[] = []
        let lastPostHashReturn = ''
        
        
        result.PostsFound.map (post => {
            if (post.VideoURLs && String(post.VideoURLs) !== '' && String(post?.VideoURLs) !== 'https://lvpr.tv') {
                filteredResults.push(post)
            }
            lastPostHashReturn = post.PostHashHex
        })
        
        return {
           
            props: {posts: filteredResults, lastPostHashReturn: lastPostHashReturn}
        }
            
    } catch (error) {
        return {error} 
    }

}

export default getPosts