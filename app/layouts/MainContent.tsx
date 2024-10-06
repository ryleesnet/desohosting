import { arrayOfServerTypes, serverType } from "../types";
import ItemCard from "./includes/ItemCard";

export default function MainContent () { 
    
    
    const data: arrayOfServerTypes = {
        serverInfo: [
          { name: "Mini Server", memory: 1, vcpu: 1, ssd: 32, price: 5, priceInTokens: 350 },
          { name: "Starter Server", memory: 2, vcpu: 2, ssd: 32, price: 7, priceInTokens: 350 },
          { name: "Standard Server", memory: 4, vcpu: 2, ssd: 60, price: 12, priceInTokens: 525  },
          { name: "Large Server", memory: 8, vcpu: 4, ssd: 60, price: 24, priceInTokens: 700  },
          { name: "XLarge Server", memory: 16, vcpu: 8, ssd: 60, price: 48, priceInTokens: 700  },
          { name: "Starter Node Server", memory: 32, vcpu: 8, ssd: 500, price: 150, priceInTokens: 875  },
          { name: "Standard Node Server", memory: 64, vcpu: 8, ssd: 1000, price: 250, priceInTokens: 1050  },
          { name: "Large Node Server", memory: 128, vcpu: 16, ssd: 1000, price: 500, priceInTokens: 2100  }
        ]
      };


    return(
        <div className="flex flex-wrap justify-around w-full">
            {data.serverInfo.map((serverInfo) => (
                <div  key={serverInfo.name} className="m-2">
                    <ItemCard {...serverInfo}/>
                </div>
                
            ))
        }
            
        </div>
    )



}