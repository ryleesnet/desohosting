import getCurrentVMs from "@/app/hooks/getCurrentVMs"
import { useVMListStore } from "@/app/stores/vmlist"
import { useEffect } from "react"
import VMCard from "./VMCard"
import { useGeneralStore } from "@/app/stores/general"
import { useUser } from "@/app/context/user"
import { arrayOfServerTypes } from "@/app/types"
import { onError } from "@apollo/client/link/error"
import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client"
import { burnDeSoToken, identity, sendDeso, SendDeSoRequest, submitPost, SubmitPostRequestParams, TransactionSpendingLimitResponseOptions, TxRequestWithOptionalFeesAndExtraData } from "deso-protocol"
import CreateVMs from "@/app/hooks/createVMs"
import ItemCard from "./ItemCard"

export default function NewVms () { 

    const setIsVisible = useGeneralStore((store) => store.setIsVisible)
    const setTokenPrice = useGeneralStore((store) => store.setTokenPrice)
    const tokenPrice = useGeneralStore((store) => store.tokenPrice)
    const desoPrice = useGeneralStore((store) => store.desoPrice)
    const setDesoPrice = useGeneralStore((store) => store.setDesoPrice)
    const currency = useGeneralStore((store) => store.currency)
    const walletBalanceDeSo = useGeneralStore((store) => store.walletBalanceDeSo)
    const walletBalanceTokens = useGeneralStore((store) => store.walletBalanceTokens)
    const searchTerm = useGeneralStore((store) => store.searchTerm)
    const serverTypeInfo = useGeneralStore((store) => store.serverTypeInfo)
    const setServerTypeInfo = useGeneralStore((store) => store.setServerTypeInfo)
    const isConfirmedVisible = useGeneralStore((store) => store.isConfirmedVisible)
    const setIsConfirmedVisible = useGeneralStore((store) => store.setIsConfirmedVisible)
    
    const characters = 'ABCDEFabcdef0123456789';
    function generateRandomString(length: number) {
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }

    const vmHostname: string = generateRandomString(12)
    const passwd: string = generateRandomString(16)

    const contextUser = useUser()
    const walletBalanceTokensConverted = (walletBalanceTokens / 1000000000000000000 )
    const walletBalanceDesoConverted = (walletBalanceDeSo / 1000000000 )

    const data: arrayOfServerTypes = {
        
        serverInfo: [
          { name: "Mini Server", memory: 1, vcpu: 1, ssd: 32, price: 5, priceInTokens: 350 },
          { name: "S1 Server", memory: 2, vcpu: 2, ssd: 32, price: 7, priceInTokens: 350 },
          { name: "S2 Server", memory: 4, vcpu: 2, ssd: 60, price: 12, priceInTokens: 525  },
          { name: "S3 Server", memory: 8, vcpu: 4, ssd: 60, price: 24, priceInTokens: 700  },
          { name: "S4 Server", memory: 16, vcpu: 8, ssd: 60, price: 48, priceInTokens: 700  },
          //{ name: "N1 Node Server", memory: 32, vcpu: 8, ssd: 500, price: 150, priceInTokens: 875  },
          //{ name: "N2 Node Server", memory: 64, vcpu: 8, ssd: 1000, price: 250, priceInTokens: 1050  },
          //{ name: "N3 Node Server", memory: 128, vcpu: 16, ssd: 1000, price: 500, priceInTokens: 2100  }
        ]
      };

      const filteredData = data.serverInfo.filter(item => {
        const memory = item.memory.toString().includes(searchTerm); 
        const vcpu = item.vcpu.toString().includes(searchTerm); 
        const ssd = item.ssd.toString().includes(searchTerm);
        const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        return memory || ssd || nameMatch || nameMatch;
      }
    )
    const errorLink = onError((e) => {
        //console.log(e)
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
        
        <div className="border border-sky-200 justify-items-center mt-4 ml-10 mr-10 bg-slate-700 rounded-xl">
        <p className="bg-slate-800 text-sky-200 text-lg p-2 text-center rounded-xl w-full">New Server</p> 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-4">
       
            {filteredData.map((serverInfo) => (
                <div  key={serverInfo.name} className="m-2">
                    <ItemCard {...serverInfo}/>
                </div>
                
            ))
        }
             
        </div>
        </div>
       )

}