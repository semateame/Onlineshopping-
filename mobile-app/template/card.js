import  React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';


const Item = ({item,clickHandler}) => (

  <Card>
    <Card.Title title={item.name} />
    <Card.Content>
      <Title>{"$"} {item.price}</Title>
      <Paragraph>{item.description}</Paragraph>
    </Card.Content>
    <TouchableOpacity
    onPress={()=>clickHandler(item)}
    >
    <Card.Cover source={{ uri:`http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/file/upload/${item.image}` }} style={styles.image} />
    </TouchableOpacity>

  </Card>
);

export default Item;