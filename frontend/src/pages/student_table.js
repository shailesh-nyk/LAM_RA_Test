import React, { Component } from 'react';
import axios from 'axios';
import config from './../config';
import { ToastsStore, ToastsContainerPosition, ToastsContainer } from 'react-toasts';

class StudentTableComponent extends Component {
    constructor(props) {
       super(props);
       this.state = {
           records : null
       }
    }
    componentDidMount() {
        this.getAll();
    }
    render() {
      return !this.state.records ? 
            <div className="d-flex justify-content-center align-items-center"  style={{height: "100vh"}}>
                <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_CENTER} />
            </div>
          :
          <div>
            <div className="s-header s-box-shadow1">SJSU Hackathon - Registration List</div>
            <div className="s-student-table table-responsive" style={{ width: "90%" }}>
              <table id="student-registration" class="table table-striped table-bordered">
                  <thead>
                      <tr>
                          <th>Name</th>
                          <th>Student ID</th>
                          <th>Age</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>University</th>
                          <th>Category</th>
                      </tr>
                  </thead>
                  <tbody>
                      {this.state.records.map(row => {
                          return ( 
                            <tr>
                                <td>{row.full_name}</td>
                                <td>{row.student_id[0]}</td>
                                <td>{row.age[0]}</td>
                                <td>{row.email[0]}</td>
                                <td>{row.phone[0]}</td>
                                <td>{row.university}</td>
                                <td>{row.category}</td>
                            </tr>
                        )
                      })}
                  </tbody>
                 
              </table>
          </div>
        

          </div>
    }
    getAll() {
        axios.get(config.student_API + '/api/all')
        .then(resp => {
            this.setState({
                records: resp.data.docs
            })
            window.$('#student-registration').DataTable({
                "scrollY": "calc(100vh - 300px)",
                "scrollCollapse": true,
            });
        })
        .catch(err => {
            ToastsStore.error(err.message);
        })
    }
}

export default StudentTableComponent