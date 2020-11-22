import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        };
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then( res => {
            this.setState({employee: res.data});
        });
    }
    
    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Employee Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            
                            <div style={{width: "18rem"}}> <img src={this.state.employee.imageUrl} alt="" className="img-thumbnail"/> </div>
                        </div>
                        <div className = "row">
                            <label> <b>First Name:  </b></label>
                            <div> { this.state.employee.firstName }</div>
                        </div>
                        <div className = "row">
                            <label> <b>Designation:  </b></label>
                            <div> { this.state.employee.designation }</div>
                        </div>
                        <div className = "row">
                            <label> <b>Email ID:  </b></label>
                            <div> { this.state.employee.email }</div>
                        </div>
                        <div className = "row">
                            <label> <b>Salary:  </b></label>
                            <div> { this.state.employee.salary }</div>
                        </div>
                        <div className = "row">
                            <label> <b>Resume:  </b></label>
                            <div><a className="button" href={this.state.employee.resumeUrl} target="_blank" rel="noopener noreferrer">View</a></div>
                        </div>
                        <div className = "row">
                            <label> <b>Employee Video:  </b></label>
                            <div></div><a className="button" href={this.state.employee.videoUrl} target="_blank" rel="noopener noreferrer">Watch Now</a></div>
                        </div>
                </div>
            </div>
        )
    }
}

export default ViewEmployeeComponent;
