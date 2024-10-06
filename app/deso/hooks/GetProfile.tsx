import { getSingleProfile } from "../deso-api";

const getProfile = async (publicKey: string | undefined, username: string | undefined) => {
    try {
    const result = await getSingleProfile({
        PublicKeyBase58Check: publicKey,
        Username: username
    });
    const { Profile, error } = result;

    if (error) {
        console.error("Error:", error);
    }

    if (Profile) {
        return Profile
    }
    } catch (error) {
    console.error("Error:", error);
    }
};

export default getProfile