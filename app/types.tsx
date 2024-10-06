import { SubscriberNotification, GetVideoStatusRequest } from "deso-protocol";

export interface UserContextTypes {
    user: Profile | null;
    authkeys: SubscriberNotification | null;
    followers: Follows | null;
    following: Follows | null;
    //register: (username: string, publicKey: string, derivedPublicKey: string, derivedSeed: string) => Promise<void>;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    checkUser: () => Promise<void>;
}

export interface WalletInfo {
    balanceNanos: number
}

export interface buyInfoType {
    currency: string;
    amount: number;
    server: serverType
}

export interface UserContextTypes {
    user: Profile | null;
    followers: Follows | null;
    following: Follows | null;
}

export interface Follows {
    NumFollowers: number;
    PublicKeyToProfileEntry: {}
}

export interface RandomUsers {
    id: string;
    name: string;
    image: string;
}

export interface CropperDimensions {
    height?: number | null;
    width?: number | null;
    left?: number | null;
    top?: number | null;
}

export interface ShowErrorObject {
    type: string;
    message: string;
}

export interface Like {
    id: string;
    user_id: string;
    post_id: string;
}

export interface Post {
    id: string;
    user_id: string;
    video_url: string;
    text: string;
    created_at: string;
}

export interface Comment {
    id: string;
    user_id: string;
    post_id: string;
    text: string;
    created_at: string;
}

export interface CommentWithProfile {
    id: string;
    user_id: string;
    post_id: string;
    text: string;
    created_at: string;
    profile: {
        user_id: string;
        name: string;
        image: string;
    }
}

export interface PostWithProfile {
    id: string;
    user_id: string;
    video_url: string;
    text: string;
    created_at: string;
    profile: {
        user_id: string;
        name: string;
        image: string;
    }
}

export interface UploadError {
    type: string;
    message: string;
}

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

//COMPONENT TYPES

export interface CommentsHeaderCompTypes {
    params: {userName: string; postId: string; };
    post: PostWithProfile
}

export interface pendingPostListTypes {
    pendingPosts: [ pendingPostTypes ]
}
export interface pendingPostTypes {
    videoID: GetVideoStatusRequest;
    caption: string;

}

export interface arrayOfServerTypes {
    serverInfo: serverType[]
}

export interface serverType {
    name: string;
    memory: number;
    vcpu: number;
    ssd: number;
    price: number;
    priceInTokens: number;
}

export interface CommentsCompTypes {
    params: {userName: string; postId: string; };
}

export interface SingleCommentCompTypes {
    params: {userName: string; postId: string;};
    comment: CommentWithProfile
}

export interface PostMainCompTypes {
    post: PostEntryResponse
}

export interface PostMainCompTypes2 {
    post: PostEntryResponseGQL
}
export interface PostMainLikesCompTypes {
    post: PostEntryResponse
}

export interface PostPageTypes {
    params: { postHash: string; };
}

export interface PostUserCompTypes {
    post: Post;
}

export interface ProfilePageTypes {
    params: { id: string; };
}

// Layout Include Types
export interface MenuItemsTypes {
    iconString: string,
    colorString: string,
    sizeString: string
}

export interface MenuItemFollowCompTypes {
    user: RandomUsers
}

export interface TextInputCompTypes {
    string: string;
    inputType: string;
    placeholder: string;
    onUpdate: (newValue: string) => void;
    error: string;
}

// DeSo Types
export interface DeSoKeys{
        publicKey: string,
        primaryDerivedKey: {
            derivedPublicKeyBase58Check: string,
            publicKeyBase58Check: string,
            btcDepositAddress: string,
            ethDepositAddress: string,
            expirationBlock: number,
            network: string,
            accessSignature: string,
            jwt: string,
            derivedJwt: string,
            messagingPublicKeyBase58Check: string,
            messagingPrivateKey: string,
            messagingKeyName: string,
            messagingKeySignature: string,
            transactionSpendingLimitHex: string,
            signedUp: boolean,
            derivedSeedHex: string,
            transactionSpendingLimits: {
                GlobalDESOLimit: number,
                TransactionCountLimitMap: {
                    SUBMIT_POST: number
                },
                CreatorCoinOperationLimitMap: {},
                DAOCoinOperationLimitMap: {},
                NFTOperationLimitMap: {},
                DAOCoinLimitOrderLimitMap: {},
                AssociationLimitMap: {},
                AccessGroupLimitMap: {},
                AccessGroupMemberLimitMap: {},
                IsUnlimited: boolean
            },
            IsValid: boolean
        }
    }
   


export interface Profile {
    PublicKeyBase58Check: string;
    Username: string;
    Description: string;
    IsHidden: boolean;
    IsReserved: boolean;
    IsVerified: boolean;
    Comments: string;
    Posts: string;
    CoinEntry: {
        CreatorBasisPoints: number;
        DeSoLockedNanos: number;
        NumberOfHolders: number;
        CoinsInCirculationNanos: number;
        CoinWatermarkNanos: number;
        BitCloutLockedNanos: number;
    },
    DAOCoinEntry: {
        NumberOfHolders: number;
        CoinsInCirculationNanos: string;
        MintingDisabled: boolean;
        TransferRestrictionStatus: string;
    },
    CoinPriceDeSoNanos: number;
    CoinPriceBitCloutNanos: number;
    UsersThatHODL: string;
    IsFeaturedTutorialWellKnownCreator: boolean;
    IsFeaturedTutorialUpAndComingCreator: boolean;
    ExtraData: {
        DAOPublicKeysPurchased: string;
        DerivedPublicKey: string;
        DiscordURL: string;
        DisplayName: string;
        FeaturedImageURL: string;
        LargeProfilePicURL: string;
        MarkdownDescription: string;
        PinnedPostHashHex: string;
        TelegramURL: string;
        TwitterURL: string;
        WebsiteURL: string;
    },
    DESOBalanceNanos: number,
    BestExchangeRateDESOPerDAOCoin: number
  }
  
 export interface GetPostsResponse {
    PostsFound: [PostEntryResponse]
    
 }

 export interface GetPostsResponseGQL {
    posts: {
        nodes: [PostEntryResponseGQL]
    }
        
    
 }

 export interface isFollowingPublickKey {
    IsFollowing: boolean
 }


 export interface PostEntryResponse {
            PostHashHex: string, // Hex of the Post Hash. Used as the unique identifier of this post.
            PosterPublicKeyBase58Check: string, // Public key of the user who made this post.
            ParentStakeID: string, // Hex of the Parent Post Hash. If populated, this post is a comment on the parent.
            Body: string, // Text body of the post.
            ImageURLs: [], // URLs to images to include in the post
            VideoURLs: [], // URLs to videos to include in the post
            RepostedPostEntryResponse: PostEntryResponse, // RepostedPostEntryResponse is another post that this post is reposting (similar to retweeting). 
            CreatorBasisPoints: number, // Deprecated
            StakeMultipleBasisPoints: number, // Deprecated
            TimestampNanos: number, // Timestamp of the post
            IsHidden: boolean, // If true, post is filtered out everywhere.
            ConfirmationBlockHeight: number, // Block height at which this post was confirmed.
            InMempool: boolean, // If true, this post is still in the mempool and has not been confirmed in a block yet.
            ProfileEntryResponse: Profile, // This is the profile of the user who created this post.
            Comments: [PostEntryResponse], // Array of comments. These PostEntryResponses reference this post as their parent.
            LikeCount: number, // Number of likes on this post.
            DiamondCount: number, // Number of diamonds on this post.
            PostEntryReaderState: {
                LikedByReader: boolean, // True if the reader has liked this post, otherwise false.
                DiamondLevelBestowed: number, // Number of diamonds the reader has given this post. 
                RepostedByReader: boolean, // True if the reader has reposted this post, otherwise false.
                RepostPostHashHex: string // Hex of the Post Hash in which the user has reposted this post.
            },
            InGlobalFeed: boolean, // If true, this post is included in the global feed.
            InHotFeed: boolean, // If true, this post is in the hot feed.
            IsPinned: boolean, // If true, this post is pinned to the top of the feeds.
            PostExtraData: { // PostExtraData can contain any keys and string values to add metadata to a post.
                Node: string,
                EmbedVideoURL: string
            },
            CommentCount: number, // Number of comments on this post.
            RepostCount: number, // Number of times this post has been reposted.
            QuoteRepostCount: number, // Number of times this post has been quote reposted.
            ParentPosts: [PostEntryResponse], // Array of PostEntryResponses that represent the parents of this post.
            IsNFT: boolean, // If true, this post has been minted as an NFT. False otherwise.
            NumNFTCopies: number, // Number of serial numbers that were minted. 
            NumNFTCopiesForSale: number, // Number of serial numbers that are currently for sale.
            NumNFTCopiesBurned: number, // Number of serial numbers that have been burned.
            HasUnlockable: boolean, // If true, when this post is sold as an NFT, the owner will be required to provide some unlockable content.
            NFTRoyaltyToCreatorBasisPoints: number, // Percentage in basis points of the royalty that goes to this post's creator when this NFT is sold.
            NFTRoyaltyToCoinBasisPoints: number, // Percentage in basis points of the royalty that is added to the DeSo locked in this post's creator's coin when this NFT is sold.
            AdditionalDESORoyaltiesMap: {},
            AdditionalCoinRoyaltiesMap: {},
            DiamondsFromSender: number, // Number of diamonds this post received from a sender. Only populated in get-diamonded-posts
            HotnessScore: number, // Hotness score is a measure of how engaging a post is. Posts with the highest hotness scores are featured in the Hot Feed.
            PostMultiplier: number, // Multiplier applied to this post in the hot feed algorithm.
 }

 export interface PostEntryResponseGQL {
    body: string, // Text body of the post.
    diamonds: {},
    likes: [],
    postHash: string, // Hex of the Post Hash. Used as the unique identifier of this post.
    poster: {},
    replies: {},
    timestamp: string,
    videoUrls: [],
 }

  export interface State {
    loggedUserPublicKey: string | '';
    loggedUserProfile: Profile | null;
    postText: string;
    recentPost: PostEntryResponse | null;
    altLoggedUsers: { [key: string]: Profile } | null;
    showSwitchUserMenu: boolean | false;
    loading: boolean;
  }