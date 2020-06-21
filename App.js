import React, { Component } from 'react';
import { View, Text, Button, Modal, ViewPagerAndroid, Slider ,Animated,StyleSheet,Image, ImageBackground,Easing} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ViewPager from '@react-native-community/viewpager';
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import FontAwesome from 'react-native-vector-icons/FontAwesome'



const music = ["A-Lin - 有一种悲伤.mp3","	胡彦斌 _ Jony J - 返老还童.mp3","汪苏泷 - 不服 (Live).mp3","	孙燕姿 - 开始懂了 (Live).mp3","	冰块先生 - 11862.mp3"]
const url = "http://123.56.28.23/music/"
const bcki_url = "http://123.56.28.23/photo/2.jpg"
const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()
var p = 0
export default class App extends Component {
  constructor(props) {
    super(props);
   
    
    this.state = {
      visible:false,
    };
  }


  

  hide = ()=>{
    this.setState({visible:false})
  }

  render() {
    const { user, pwd, fadeAnim} = this.state;
    return (
      
      <NavigationContainer >
        <Modal visible={this.state.visible}>
          <ViewPager style={{flex:1}} initialPage={0}>
            <View key="1">
              <Text>page1</Text>
            </View>
            <View key="2">
              <Text>page2</Text>
              <Button title="退出" onPress={this.hide}/>
            </View>
          </ViewPager>
        </Modal>
        <Drawer.Navigator>
          <Drawer.Screen name = "Main" component = {Main}></Drawer.Screen>
          <Drawer.Screen name = "Setting" component = {Setting}></Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

class Main extends React.Component{
  render(){
    return<Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'ios-information-circle'
            : 'ios-information-circle-outline';
        } else if (route.name === 'List') {
          iconName = focused ? 'ios-list-box' : 'ios-list';
        } else if (route.name === 'FAQ'){
          iconName = focused ? 'ios-heart-dislike':'ios-heart-empty'
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}>
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="List" component={List}/>
      <Tab.Screen name="FAQ" component={FAQ}/>
    </Tab.Navigator>

  }
}

class Setting extends React.Component{
  render(){
     return(
      <Text>
      Setting
    </Text>

     )  
   
  }
}
class Home extends React.Component{
  render(){
     return(
        <ImageBackground style={{flex:1}}
        source={{uri: 'http://123.56.28.23/photo/11862.jpg'}}>
         <DV></DV>
          <MusicPage></MusicPage>
        </ImageBackground>
          
      

     )  
   
  }

  
}

class List extends React.Component{
  render(){
     return(
      <Stack.Navigator>
      <Stack.Screen name="ItemList" component={ItemList}/>
      <Stack.Screen name="ItemDetail" component={ItemDetail}/>
    </Stack.Navigator>

     )  
   
  }
}
class FAQ extends React.Component{
  render(){
     return(
      <Text>
      FAQ
    </Text>

     )  
   
  }
}

class ItemList extends React.Component{
  showDetail = () =>{
    this.props.navigation.navigate("ItemDetail")
  }
  render(){
     return(
      <View>
        <Text>ItemList</Text>
        <Button title="查看详情" onPress={this.showDetail} />
      </View>

     )  
   
  }
}

class ItemDetail extends React.Component{
  render(){
     return(
      <Text>
      FAQ
    </Text>

     )  
   
  }
}

class MusicPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
 
      paused:true,
      source:{uri:url+music[p]},
      w_time:0,
      current_time:0,
      player:null

    }
  }

  playCtrl =()=>{
    let paused = this.state.paused
    this.setState({
      paused:!paused
    })
  }


  next =()=>{

    p<4 ? p++:p=0;
    this.setState({
      source:{uri:url+music[p]}
    })
  }

  prev =()=>{

    p>0 ? p--:p=0;
    this.setState({
      source:{uri:url+music[p]}
    })
    
  }

  loadHandler =({duration}) => {
    this.setState({w_time:duration})
 
  }

  progressHandler =({currentTime})=>{
    this.setState({current_time:currentTime})
  }

  seekHandler =(value)=>{
    this.player.seek(value)
  }

  endHandler =()=>{
    p<4 ? p++:p=0;
    this.setState({
      source:{uri:url+music[p]}
    })
  }

  render(){
    return(
      
     
      
      <View style={{ flex:1, justifyContent:'flex-end'}}>
        <Video 
        ref={ref=>this.player=ref}
        source={this.state.source} paused={this.state.paused}
        onLoad={this.loadHandler}
        onProgress={this.progressHandler}
        progressUpdateInterval={2000}
        onEnd={this.endHandler}
        />
        
        <Text style={{textAlign:'center',marginBottom:20}}>{music[p]}</Text>
        <Slider style={{height:20}} minimumValue={0} maximumValue={this.state.w_time} value={this.state.current_time}
        onSlidingComplete={this.seekHandler}
        />


        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        
        <FontAwesome name="step-backward" style={{marginLeft:10,} } size={40}  onPress={this.prev}/>
        <FontAwesome name="play" style={{marginLeft:10,} } size={40} onPress={this.playCtrl}/>
        <FontAwesome name="step-forward" style={{marginRight:10,} } size={40}  onPress={this.next}/>
        </View>
        
      </View>
    )

  }
}
class DV extends React.Component {
  constructor(props) {
      super(props);
      
      this.state = {
          bounceValue: new Animated.Value(1), 

          rotateValue: new Animated.Value(0),
      };
  }

  componentDidMount() {
      
      this.startAnimation();
  }

  startAnimation() {
      this.state.bounceValue.setValue(1);

      this.state.rotateValue.setValue(0);
      Animated.parallel([
          
          Animated.spring(this.state.bounceValue, {
              toValue: 1,      
              friction: 20,    
          }),
          Animated.timing(this.state.rotateValue, {
              toValue: 1,  
              duration: 15000,  
              easing: Easing.out(Easing.linear),
          }),
          
      ]).start(()=>this.startAnimation());
  }

  render() {
      return (
          <View style={styles.container}>
             
              <Animated.Image source={{uri:'http://123.56.28.23/photo/4.png'}}
                              style={{width:150,
                              height: 150,borderRadius:75, 
                              transform: [
                              
                              {scale: this.state.bounceValue},
                              

                              {rotateZ: this.state.rotateValue.interpolate({
                              inputRange: [0,1],
                              outputRange: ['0deg', '360deg'],
                              })},
                   ]}}>
              </Animated.Image>

          </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  }
});