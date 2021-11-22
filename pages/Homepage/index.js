import React, { useState } from "react";
import Cart from "../../components/cart"
import {ApolloProvider,ApolloClient,HttpLink, InMemoryCache} from '@apollo/client';
import RestaurantList from '../../components/restaurantList';
import { InputGroup, InputGroupAddon,Input} from "reactstrap";
//import Dishes from '../../components/dishes';
//import AppContext from "../components/context";
//import Link from "next/link";

function Home() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://permila-mudduswamy.herokuapp.com/";
    console.log(`URL: ${API_URL}`)
    const [query, setQuery] = useState("");
    const link = new HttpLink({ uri: `${API_URL}/graphql`})
    const cache = new InMemoryCache()
    const client = new ApolloClient({link,cache});
    
  
    return (
      
        <ApolloProvider client={client}>
         <br></br>
         <h1>Select your choice of restaurant that are listed below!!<br></br>
             </h1>
          <div className="search">
          <br></br>
      
             
              <br></br>
                <InputGroup >
                <InputGroupAddon addonType="append"> Start feasting </InputGroupAddon>
                <Input
                    onChange={(e) =>
                    setQuery(e.target.value.toLocaleLowerCase())
                    }
                    value={query}
                />
           
       </InputGroup><br></br>
        </div>
        <RestaurantList search={query} />
      <Cart> </Cart>
           
           
           
        </ApolloProvider>
    );
  }


  export default Home;
  
