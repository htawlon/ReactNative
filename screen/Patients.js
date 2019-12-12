import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native'
import {Header, ThemeProvider, Card} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import NetInfo from '@react-native-community/netinfo';
import FetchPatient from './FetchPatient'

class ShowPatient extends Component{
    render(){
        return(
            <View>
                <Card title={this.props.p_name}>
                 <View style={styles.subContainer}>
                     <View style={styles.subContainerOne}>
                     <Text style={styles.subTitle}>Age:</Text>
                     <Text style={styles.subtext}>{this.props.p_age}</Text>
                     </View>

                     <View style={styles.subContainer}>
                        <View style={styles.subContainerOne}>
                            <Text style={styles.subTitle}> Table No:</Text>
                            <Text style={styles.subtext}>{this.props.p_no}</Text>
                        </View>
                     </View>
                 </View>
                 <View style={styles.subContainer}>
                        <View style={styles.subContainerOne}>
                            <Text style={styles.subTitle}> Doctor Name:</Text>
                            <Text style={styles.subtext}>{this.props.p_doctor}</Text>
                        </View>
                        <View style={styles.subContainerOne}>
                            <Text style={styles.subTitle}> Diseases:</Text>
                            <Text style={styles.subtext}>{this.props.p_disease}</Text>
                        </View>
                     </View>
                </Card>
            </View>
        )
    }
}
export default class Patient extends Component{
   constructor(props){
       super(props)
       this.state=({
           patients:[],
           loading: false
       })
   }
   componentDidMount=()=>{
       this.getPatients();
   }
   getPatients=()=>{
       FetchPatient()
       .then((res)=>{
           this.setState({patients:res})
           console.log(res)
       })
       .catch((err)=>{
           console.log(err)
       })
   }
   
    render(){

        return(
        <View>
            <Header
            rightComponent={
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Newpatient")}>
                    <Text>
                        <Icon name="user-plus" size={14} color="#fff"></Icon>
                    </Text>
                </TouchableOpacity>
            }
            centerComponent={{text:"Patient", style:{color: "#fff"}}}
            >
            </Header>
            <View>
                <FlatList
                refreshing={this.state.loading}
                onRefresh={()=>this.getPatients()}
                keyExtractor={(p)=>p.id.toString()} 
                data={this.state.patients}
                renderItem={(p)=>{
                    //console.log(p)
                    return(
                        <ShowPatient 
                        p_doctor={p.item.doctor.doctor_name}
                        p_disease={p.item.category.category_name}
                        p_no={p.item.table_no}
                        p_age={p.item.age}
                        p_name={p.item.patient_name}
                        ></ShowPatient>
                    )
                }}
                >

                </FlatList>
            </View>
        </View>
        )
    }
}
const styles=StyleSheet.create({
    subContainer:{
        flexDirection: 'row'
    },
    subContainerOne:{
        width:"50%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    subTitle:{
        color: "#ccc",
        fontSize: 11
    },
    subText:{
        padding: 5,
    }
})