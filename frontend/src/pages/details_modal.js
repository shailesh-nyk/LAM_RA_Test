
import React from 'react';
import renderjson from 'renderjson';
import axios from 'axios';
import config from './../config';

class DetailsModal extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            details : null
        }
    }
    componentDidMount() {
        this.getDetails(this.props.service.svcID);
    }
    render() {
        return ( 
            <div class="modal fade" id={"detailsModal" + this.props.service.svcID} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div class="modal-content"  style={{width: "90vw"}}>
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Details -- {this.props.service.name}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                {this.props.service.name.includes("Node") ? 
                    (
                      <div class="modal-body s-details-modal-body" id={"detailsModalBody" + this.props.service.svcID}>
                         <iframe src={this.props.service.host + ":" + this.props.service.port + "/status"} style={{width: "100%", height: "100%"}}>
                         </iframe>
                      </div>
                    ) : (
                      <div class="modal-body s-details-modal-body" id={"detailsModalBody" + this.props.service.svcID}>
                      </div>
                   )
                }
              </div>
            </div>
          </div>
        )
    }
    getDetails(svcID) {
        axios.get(config.monitor_API + '/details', {
          params : {
              svcID : svcID
              }
        })
        .then(resp => {
            document.getElementById("detailsModalBody" + this.props.service.svcID).appendChild(
                renderjson(resp.data)
            );
        })
    }
}

export default DetailsModal