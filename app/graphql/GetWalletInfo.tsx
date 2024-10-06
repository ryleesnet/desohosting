import { gql } from "@apollo/client";

export const GET_TOKEN_AMOUNT = gql `
query TokenBalances($filter: TokenBalanceFilter, $publicKey: String!) {
  tokenBalances(filter: $filter) {
    nodes {
      balanceNanos
    }
  }
  desoBalance(publicKey: $publicKey) {
    balanceNanos
  }
}
`