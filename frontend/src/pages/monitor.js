import React, { Component } from 'react';
import axios from 'axios';
import config from './../config';
import RestartModal from './restart_modal';
import LogModal from './log_modal';
import DetailsModal from './details_modal';
import { ToastsStore, ToastsContainer, ToastsContainerPosition } from 'react-toasts';

class Monitor extends Component {
    constructor(props) {
        super(props);
        this.getStatus = this.getStatus.bind(this);
        this.restartService = this.restartService.bind(this);
        this.getLogs = this.getLogs.bind(this);
        config.socket.emit("openSocket");
        config.listen(config.socket, this.getStatus);
        config.listenLogs(config.socket, this.getLogs);
        this.state = {
            data: null
        }
    }
    componentDidMount() {
    }
    render() {
        return !this.state.data ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="spinner-border text-secondary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
        ):(
            <div>
            <div className="s-header s-box-shadow1">Service Monitoring</div>
            <div className="d-flex p-5 justify-content-center">
                {this.state.data.map(server => {
                    return (
                        <div class="card s-monitor-card">
                            <div class="s-status" style={server.active ? { backgroundColor: "#28a745" } : { backgroundColor: "#dc3545" }}>
                                {server.name}
                            </div>
                            <div class="card-body">
                                <div class="s-monitor-details">
                                    <span>Host:</span><span>{server.host}</span> 
                                </div>
                                <div class="s-monitor-details">
                                    <span>Port:</span><span>{server.port}</span> 
                                </div>
                                <div class="s-monitor-details">
                                    <span>Active:</span><span>{server.active.toString().toUpperCase()}</span> 
                                </div>
                                <div class="s-monitor-details">
                                    <span>{server.active ? 'Active since' : 'Last active'}:</span><span>{server.activeTime}</span> 
                                </div>
                                <div className="s-monitor-card-actions mt-5">
                                    {server.active ?
                                        <button class="btn btn-secondary" disabled="true"> Start</button>
                                        :
                                        <button class="btn btn-success" data-target data-toggle="modal" data-target={"#restartModal" + server.svcID}>Start</button>
                                    }
                                    {server.active ?
                                        <button class="btn btn-danger" onClick={() => this.stopService(server.svcID)}>Stop</button>
                                        :
                                        <button class="btn btn-secondary" disabled="true">Stop</button>
                                    }
                                    {server.active ?
                                        <i title="View details" class="fas fa-info-circle" data-target data-toggle="modal" data-target={"#detailsModal" + server.svcID}></i>
                                        :
                                        null
                                    }
                                    <i title="View Logs" class="fas fa-file-alt" data-target data-toggle="modal" data-target={"#logModal" + server.svcID}></i>
                                </div>
                            </div>
                            <RestartModal service={server} restart={this.restartService} />
                            <LogModal service={server} />
                            {server.active ?
                                <DetailsModal service={server} />
                                :
                                null
                            }
                        </div>
                    )
                })}
            </div>
            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_CENTER} />
            </div>
        )
    }
    getStatus() {
        axios.get(config.monitor_API + '/status')
        .then(resp => {
            this.setState({
                data: resp.data
            })
            ToastsStore.warning("Status updated")
        })
        .catch(err => {
            ToastsStore.error("Could not fetch status")
        })
    }
    getLogs(resp) {
        if(this.state.data) {
            let tmp = this.state.data.map(service => {
                if(service.svcID == resp.svcID) {
                    service.log = resp.log;
                }
                return service;
            })
            this.setState({
                data: tmp
            })
        }
    }
    restartService(svcID) {
        axios.get(config.monitor_API + '/restart', {
            params : {
                svcID : svcID
            }
        })
        .then(resp => {
            ToastsStore.success("Service restarted. Please wait for updates. Meanwhile, you can check the logs")
        })
        .catch(err => {
            ToastsStore.error("Service could not be restarted. Please try again.")
        })
    }
    stopService(svcID) {
        axios.get(config.monitor_API + '/stop', {
            params : {
                svcID : svcID
            }
        })
        .then(resp => {
            ToastsStore.success("Service stopped. Please wait for updates. Meanwhile, you can check the logs")
        })
        .catch(err => {
            ToastsStore.error("Service could not be stopped. Please try again.")
        })
    }
}

export default Monitor