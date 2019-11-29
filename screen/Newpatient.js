import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Picker, Button,KeyboardAvoidingView} from 'react-native'
import {Header} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'

import FetchDoctor from './FetchDoctor'
import FetchCategory from './FetchCatetgory'

export default class Newpatient extends Component{
    constructor(props){
        super(props)
        this.state=({
            doctors: [],

            category: [],

            patient_name: '',
            age: '',
            address: '',
            table_no: '',
            doctor_id: '',
            category_id: '',

            showError: false,
            error: ''
        })
       
    }

    savePatient=()=>{
       if(this.state.patient_name.length <=0){
            this.setState({showError: true, error: "The patient name is required."})
            return;
       }
       if(this.state.age.length <=0){
        this.setState({showError: true, error: "The patient age is required."})
        return;
   }
   let p={
       patient_name: this.state.patient_name,
       age: this.state.age,
       address: this.state.address,
       table_no: this.state.table_no,
       doctor_id: this.state.doctor_id,
       category_id: this.state.category_id
   }
   fetch("http://192.168.0.101:8000/api/patient/new",{
       method: "post",
       headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
       body: JSON.stringify(p),
   })
   .then(async(res)=>{
       const resJson=await res.json();
       console.log(resJson)
   })
   .catch((err)=>{
       console.log(err)
   })
       
    }
    componentDidMount=()=>{
        this.getDoctors();
        this.getCategory();
    }
    getDoctors=()=>{
        FetchDoctor()
        .then((res)=>{
            this.setState({doctors: res})
        })
        .catch()
    }
    getCategory=()=>{
        FetchCategory()
        .then((res)=>{
            this.setState({category: res})
        })
        .catch()
    }

    render(){
        return(
            <KeyboardAvoidingView enableOnAndriod={true}>
        <View>
            <Header
            leftComponent={
                <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                    <Text>
                        <Icon name="arrow-left" size={14} color="#fff"></Icon>
                    </Text>
                </TouchableOpacity>
            }
            centerComponent={{text:"Add Patient", style:{color: "#fff"}}}
            >
            </Header>
            
            {
                this.state.showError && (
                    <View style={styles.errorBody}>
                        <Text style={styles.errorText}>{this.state.error}</Text>
                        </View>
                )
            }
            <View style={styles.container}>
            <View style={styles.formGroup}>
                    <TextInput
                    returnKeyType="next"
                    onChangeText={(t)=>this.setState({patient_name:t})}
                    value={this.state.patient_name}
                    style={styles.formConrtrol}
                    placeholder="Patient Name"
                    >
                    </TextInput>
                </View>
                <View style={styles.formGroup}>
                    <TextInput
                    keyboardType="numeric"
                    onChangeText={(t)=>this.setState({age:t})}
                    value={this.state.age}
                    style={styles.formConrtrol}
                    placeholder="Age"
                    >
                    </TextInput>
                </View>
                <View style={styles.formGroup}>
                    <TextInput
                    multiline={true}
                    onChangeText={(t)=>this.setState({address:t})}
                    value={this.state.address}
                    style={styles.formConrtrol}
                    placeholder="Address"
                    >
                    </TextInput>
                </View>
                <View style={styles.formGroup}>
                    <TextInput
                    onChangeText={(t)=>this.setState({table_no:t})}
                    value={this.state.table_no}
                    style={styles.formConrtrol}
                    placeholder="Table No"
                    >
                    </TextInput>
                </View>
                <View style={styles.formGroup}>
                    <Picker
                    selectedValue={this.state.doctor_id}
                    onValueChange={(t)=>this.setState({doctor_id: t})}
                    >
                        <Picker.Item label="Doctor" value=""></Picker.Item>
                        {
                            this.state.doctors.map((d)=>{
                                return(
                                    <Picker.Item label={d.doctor_name} value={d.id} key={d.id.toString()}></Picker.Item>
                                )
                            })
                        }
                    </Picker>
                </View>
                <View style={styles.formGroup}>
                    <Picker
                    selectedValue={this.state.category_id}
                    onValueChange={(t)=>this.setState({category_id: t})}
                    >
                        <Picker.Item label="Diseases" value=""></Picker.Item>
                        {
                            this.state.category.map((c)=>{
                                return(
                                    <Picker.Item label={c.category_name} value={c.id} key={c.id.toString()}></Picker.Item>
                                )
                            })
                        }
                    </Picker>
                </View>
                <View style={styles.formGroup}>
                    <Button
                        onPress={()=>this.savePatient()}
                     title="Save"
                    ></Button>
                </View>
            </View>
        </View>
        </KeyboardAvoidingView>
        
        )
    }
}
const styles=StyleSheet.create({
    container: {
        padding: 60,
    },
    formGroup:{
        marginBottom: 10
    },
    formConrtrol: {
        borderWidth:1,
        borderColor: "#000",
        borderRadius: 10,
        padding: 5
    },
    errorBody:{
        backgroundColor:"#fff",
        position: 'absolute',
        top: 20,
        right: 5,
        padding: 10,
        borderColor:"red",
        borderRadius: 10,
    },
    errorText:{
        color:'red'
    }
})