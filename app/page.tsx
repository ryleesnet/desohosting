
import TopNav from "./layouts/includes/TopNav";
import MainContent from "./layouts/MainContent";
import WalletBalance from "./layouts/includes/WalletBalance";
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, from, useQuery } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import CreateVMs from "./hooks/createVMs";


export default function Home() {


  return (
      <>
     
      <TopNav />
      
      <MainContent />
    
      </>
  );
}
