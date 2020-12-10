import React, { Component } from 'react';
import { Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native';
var {height, width } = Dimensions.get('window');

export default class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      
     
      dataFood:[],
      selectCatg:0
    }
  }

  componentDidMount(){
    const url = "http://tutofox.com/foodapp/api.json"
    return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        dataFood:responseJson.food
      });

    })
    .catch((error) =>{
      console.error(error);
    });
  }
  render() {
    return (
       <ScrollView>
        <View style={{ flex: 1,backgroundColor:"#f2f2f2",paddingTop: 20, }}>
          
           <View style={{width:width, borderRadius:40, paddingVertical:20, backgroundColor:'white'}}>
             

              <FlatList
              //horizontal={true}
              data={this.state.dataFood}
              numColumns={3}
              renderItem={({ item }) => this._renderItemFood(item)}
              keyExtractor = { (item,index) => index.toString() }
            />
           
          </View>

      </View>
       </ScrollView>
     
    );
  }
  _renderItemFood(item){
    let catg = this.state.selectCatg
    if(catg==0||catg==item.categorie)
    {
    return(
      <TouchableOpacity style={styles.divFood}>
        <Image
             style={styles.imageFood}
          resizeMode="contain"
          source={{uri : item.image}} />
       <View style={{height:((width/2)-20)-90, backgroundColor:'transparent', width:((width/2)-20)-10}} />
            <Text style={{fontWeight:'bold',fontSize:22,textAlign:'center'}}>
              {item.name}
            </Text>
            <Text>Descp Food and Details</Text>
            <Text style={{fontSize:20,color:"green"}}>${item.price}</Text>
      </TouchableOpacity>
    )
  }
}
}

const styles = StyleSheet.create({
 
  divCategorie:{
    backgroundColor:'red',
    margin:5, alignItems:'center',
    borderRadius:10,
    padding:10
  },
  titleCatg:{
    fontSize:30,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:10
  } ,
  imageFood:{
    width:((width/2)-20)-10,
    height:((width/2)-20)-30,
    backgroundColor:'transparent',
    position:'absolute',
    top:-45
  },
  divFood:{
    width:(width/2)-20,
    padding:10,
    borderRadius:10,
    marginTop:55,
    marginBottom:5,
    marginLeft:10,
    alignItems:'center',
    elevation:8,
    shadowOpacity:0.3,
    shadowRadius:50,
    backgroundColor:'white',
  }
});