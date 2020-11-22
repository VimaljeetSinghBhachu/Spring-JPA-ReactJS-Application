import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import ReactS3 from 'react-s3';
import axios from 'axios';

const key1 = 'hidden';
const key2 = 'hidden';

const configImage = {
    bucketName: 'testimageupload28102020',
    dirName: 'photos',
    region: 'us-east-1',
    accessKeyId: key1,
    secretAccessKey: key2,
  }
const configResume = {
    bucketName: 'testimageupload28102020',
    dirName: 'resumes',
    region: 'us-east-1',
    accessKeyId: key1,
    secretAccessKey: key2,
  }
const configVideo = {
    bucketName: 'testimageupload28102020',
    dirName: 'videos',
    region: 'us-east-1',
    accessKeyId: key1,
    secretAccessKey: key2,
  }

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // step 2
            id: this.props.match.params.id,
            firstName: '',
            designation: '',
            email: '',
            salary: '',
            imageUrl: '',
            resumeUrl: '',
            videoUrl: '',
            submitted: false,
            disable: false,
            edit:false
            
        };
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeDesignationHandler = this.changeDesignationHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                this.setState(prev => { return { employee:res.data,edit:!prev.edit,disable:!prev.disable } })
                let employee = res.data;
                this.setState({id: employee.id,
                    firstName: employee.firstName,
                    designation: employee.designation,  
                    email : employee.email,
                    salary: employee.salary,
                    imageUrl: employee.imageUrl,
                    resumeUrl: employee.resumeUrl,
                    videoUrl: employee.videoUrl,
                });
            });
        }        
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, designation: this.state.designation, email: this.state.email, salary: this.state.salary,
            imageUrl: this.state.imageUrl, resumeUrl: this.state.resumeUrl, videoUrl: this.state.videoUrl,};
        console.log('employee => ' + JSON.stringify(employee));

        // step 5
        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.setState(prev => { return {submitted:!prev.submitted,edit:!prev.edit,disable:!prev.disable } })
                this.props.history.push('/employees');
            });
        }else{
            this.setState(prev => { return { disable: !prev.disable } })
            axios.put("http://localhost:8010//employees/"+this.state.id,this.state.employee).then( res => {
                this.setState(prev => { return {submitted:!prev.submitted,edit:!prev.edit,disable:!prev.disable } })
                //this.props.history.put('/employees');
            });
        }
    }

    changeIdHandler= (event) => {
        this.setState({id: event.target.value});
    }

    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeDesignationHandler= (event) => {
        this.setState({designation: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({email: event.target.value});
    }
    changeSalaryHandler= (event) => {
        this.setState({salary: event.target.value});
    }

    cancel(){
        this.props.history.push('/employees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Employee</h3>
        }else{
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    count = 0;
    uploadImage = (e)=> {
        console.log(e.target.files[0]);
        ReactS3.uploadFile(e.target.files[0],configImage)
            .then(res => {
                //console.log(res.result.url + res.key);
                return res.result.url + res.key
                }).then(result=>{
                    console.log(result)
                    var emp={...this.state.employee}
                    emp.imageUrl=result
                    this.setState({imageUrl: emp.imageUrl})
                })
                
            .catch(err => console.log(err))
            if(this.result!== ''){
                this.count=this.count + 1;
                
            }else{}
      }
      uploadResume=(e1)=>{
        console.log(e1.target.files[0])
        ReactS3.uploadFile(e1.target.files[0],configResume)
            .then(res => {
                return res.result.url + res.key
                }).then(result=>{
                    console.log(result)
                    var emp={...this.state.employee}
                    emp.resumeUrl=result
                    this.setState(prev=>{return {resumeUrl:emp.resumeUrl}})
                })
        
            .catch(err => console.log(err))
            if(this.result!== ''){
                this.count=this.count + 1;
            }else{}
    }
    uploadVideo = (e2)=> {
        console.log(e2.target.files[0]);
        ReactS3.uploadFile(e2.target.files[0],configVideo)
            .then(res => {
                //console.log(res.result.url + res.key);
                return res.result.url + res.key
                }).then(result=>{
                    console.log(result)
                    var emp={...this.state.employee}
                    emp.videoUrl=result
                    this.setState({videoUrl: emp.videoUrl})
        
                })
            .catch(err => console.log(err))
            if(this.result!== ''){
                this.count=this.count + 1;
            }else{}
      }
      
    //   buttonCondition() {
    //     console.log(this.count)
    //       if(this.count<3){
    //           alert("Uploading Files...")
    //       }else{
    //         call(this.saveOrUpdateEmployee);
    //       }
    //   }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
{/* 
                                        <div className = "form-group">
                                            <label> Id: </label>
                                            <input placeholder="Id" name="id" disabled={this.state.disable} className="form-control" 
                                                value={this.state.id} onChange={this.changeIdHandler}/>
                                        </div>  */}
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Designation: </label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" 
                                                value={this.state.designation} onChange={this.changeDesignationHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={this.state.email} onChange={this.changeEmailHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Salary: </label>
                                            <input type="number" placeholder="Salary in INR" name="salary" className="form-control" 
                                                value={this.state.salary} onChange={this.changeSalaryHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Upload Image: </label>
                                            <input type="file" className="form-control" onChange={this.uploadImage}/>
                                        </div>  
                                        <div className = "form-group">
                                            <label> Upload Resume: </label>
                                            <input type="file" className="form-control" onChange={this.uploadResume}/>
                                        </div>  
                                        <div className = "form-group">
                                            <label> Upload Video: </label>
                                            <input type="file" className="form-control" onChange={this.uploadVideo}/>
                                        </div>      
                                        <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                        
                                        {/* {this.state.edit ? <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button> : <button className="btn btn-success" disabled={!this.state.disable} >Uploading...</button>} */}
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent
