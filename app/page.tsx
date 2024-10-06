"use client"
import TopNav from "./layouts/includes/TopNav";
import MainContent from "./layouts/MainContent";
import WalletBalance from "./layouts/includes/WalletBalance";
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, from, useQuery } from "@apollo/client";
import { onError } from "@apollo/client/link/error";


export default function Home() {
  const errorLink = onError((e) => {
    console.log(e)
    })
  
  const link = from ([
    errorLink,
    new HttpLink({ uri: "https://graphql-prod.deso.com/graphql"}),
  ]);
  
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  })

  return (
      <>
      <ApolloProvider client={client}>
      <TopNav />
      <WalletBalance/>
      <MainContent />
      </ApolloProvider>
      </>
  );
}
