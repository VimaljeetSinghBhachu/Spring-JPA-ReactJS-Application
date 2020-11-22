import React, { Component } from 'react';
// import EmployeeService from '../services/EmployeeService';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
//import ReactS3 from 'react-s3';
import S3FileUpload from 'react-s3'; 


const key1 = 'hidden';
const key2 = 'hidden';

const configImage = {
    bucketName: 'testimageupload28102020',
    dirName: 'photos',
    region: 'us-east-1',
    accessKeyId: key1,
    secretAccessKey: key2,
  }


class ListEmployeeComponent extends Component {
    state = {
        employees: [],
        show: false,
        employee: {},
        edit: false,
        details:false
    }

    getdata = () => {
        axios.get("http://localhost:8080/api/employees/")
            .then(res => {
                this.setState({ employees: res.data })
            })
            .catch(err => console.log(err));
    }
    componentDidMount = () => {
        this.getdata();
    }
    deleteEmployee = (props) => {
        axios.delete("http://localhost:8080/api/employees/" + props.original.id)
            .then(res => this.getdata())
            .catch(err => console.log(err));
            S3FileUpload
            .deleteFile(props.original.imageUrl, configImage)
            .then(response => console.log(response))
            .catch(err => console.error(err))
    }
    
    show = () => {
        this.setState(prev => {
            return { show: !prev.show }
        })
    }
    render() {
        const data = this.state.employees;
        console.log(this.state.employees);
        const columns = [
            {
                Header: "Id",
                accessor: "id",
                filterable: true
            },
            {
                Header: "Name",
                accessor: "firstName",
                filterable: true,
                
            },
            {
                Header: "Designation",
                accessor: "designation",
                filterable: true
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Salary",
                accessor: "salary",
                filterable: true
            },
            {
                Header: "Actions",
                Cell: props => {
                    return (
                        <button style={{marginLeft: "30px"}} className="btn btn-danger" onClick={() =>this.deleteEmployee(props)}>Delete</button>
                    )
                    
                },
                sortable: false
                
            },
            {
                Header: "Actions",
                Cell: props => {
                    return (
                        //<Link to={"/form/"+props.original.id}><button>Edit</button></Link>
                        <Link to={"/add-employee/"+props.original.id}><button style={{marginLeft: "30px"}}className="btn btn-info">Update</button></Link>
                    )
                },
                sortable: false
            },
            {
                Header: "Actions",
                Cell: props => {
                    return (
                        <Link to={"/view-employee/"+props.original.id}><button style={{marginLeft: "30px"}} className="btn btn-info">View</button></Link>
                    )
                },
                sortable: false
            }
        ]
        var show=(
        <div><Link to={"/add-employee/_add"}><button className="btn btn-primary">Add Employee</button></Link><br />
        <br />
        <ReactTable data={data} columns={columns} defaultPageSize={5}/>
        </div>)
        return show;
    }
}

export default ListEmployeeComponent
