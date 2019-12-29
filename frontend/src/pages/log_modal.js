
import React from 'react';

class LogModal extends React.Component { 
    constructor(props) {
        super(props);
    }
    render() {
        return ( 
            <div class="modal fade" id={"logModal" + this.props.service.svcID} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div class="modal-content"  style={{width: "90vw"}}>
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Logs -- {this.props.service.name}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body s-log-modal-body">
                    {this.props.service.log.split('\n').map(i => {
                        return <p>{i}</p>
                    })}
                </div>
              </div>
            </div>
          </div>
        )
    }
  
}

export default LogModal;