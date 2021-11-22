import {gql,useQuery} from '@apollo/client';
import Dishes from "./dishes"
import {useContext, useEffect, useState} from 'react';
import Link from "next/link"
import AppContext from "./context";

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  Input
} from "reactstrap";

function RestaurantList(props){
  const[restaurantID, setRestaurantID] = useState(0)
  const {cart } = useContext(AppContext);
  const [state, setState] = useState(cart)
  const [query, setQuery] = useState('');
  const GET_RESTAURANTS = gql`
    query {
      restaurants {
        id
        name
        description
        image {
          url
        }
      }
    }
  `;

 
 const { loading, error, data } = useQuery(GET_RESTAURANTS)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;




let searchQuery = data.restaurants.filter((res) =>{
    return res.name.toLowerCase().includes(props.search)
  })

let restId = searchQuery[0]?.id
 
// definet renderer for Dishes
const renderDishes = (restaurantID) => {
  return (<Dishes restId={restaurantID} query={query}> </Dishes>)
};


if(searchQuery.length > 0){
  const restList = searchQuery.map((res) => (
    <Col xs="6" sm="4" key={res.id}>
      <Card style={{ margin: "0 1rem 20px 1rem" }}>
        <CardImg
          top={true}
          style={{ height: 250 }}
          src={res.image.url}
        />
        <CardBody>
          <CardText>{res.description}</CardText>
        </CardBody>
        <div className="card-footer">
        
        <Button color="info" onClick={()=> setRestaurantID(res.id)}>{res.name}</Button>
         
        </div>
      </Card>
    </Col>
  ))
  const renderSearchBar = () => {
    return (
      <InputGroup >
        <InputGroupAddon addonType="append"> Flavors </InputGroupAddon>
        <Input
          onChange={(e) =>
          setQuery(e.target.value.toLocaleLowerCase())
          }
          value={query}
        />
      </InputGroup>
    );
  }

  return(

    <Container>
    <Row xs='3'>
      {restList}
    </Row>
  
    <Row xs='3'>
    {renderSearchBar()}
    {restaurantID?renderDishes(restaurantID):<h1> Select your dishes to enjoy a sumptous meal</h1>}
    </Row>
 
 
    </Container>
 
  )
} else {
  return <h1> No Restaurants Found</h1>
}
}
   export default RestaurantList
