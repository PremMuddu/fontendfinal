import {useRouter} from "next/router"
import {gql,useQuery} from '@apollo/client';
import {useState, useContext} from 'react'
import AppContext from "./context"
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col} from "reactstrap";
  function Dishes({restId, query}){
    const [restaurantID, setRestaurantID] = useState()
    const {addItem} = useContext(AppContext)

    const GET_RESTAURANT_DISHES = gql`
  query($id: ID!) {
    restaurant(id: $id) {
      id
      name
      dishes {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;

  const router = useRouter();

  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: restId},
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR here</p>;
  if (!data) return <p>Not found</p>;

  let restaurant = data.restaurant;
  const dishes = restaurant && restaurant.dishes 
  ? restaurant.dishes.filter(dish => dish.name.toLowerCase().includes(query))
  : []

  console.log('restaurant: ', restaurant);

  if (restId ){
    return (
      <>
          {dishes.map((res) => (
            <Col xs="4" sm="4" style={{ padding: 0 }} key={res.id}>
              <Card style={{ margin: "0 10px" }}>
                <CardImg
                  top={true}
                  style={{ height: 250}}
                  src={res.image.url}
                />
                <CardBody>
                  <CardTitle>{res.name}</CardTitle>
                  <CardText>{res.description}</CardText>
                  <CardText>${res.price}</CardText>
                </CardBody>
                <div className="card-footer">
                  <Button color="info"
                    outline="black"
                    color="black"
                    onClick = {()=> addItem(res)}
                  >
                    + Add To Cart
                  </Button>
                  
                </div>
               

              </Card>
            </Col>
          ))}
        </>
        )}
        else{
          return <h1> Select your dishes to enjoy a sumptous meal</h1>
        }
    }


   
    export default Dishes;
