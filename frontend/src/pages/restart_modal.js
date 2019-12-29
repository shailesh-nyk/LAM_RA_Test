
import React from 'react';

class RestartModal extends React.Component { 
    constructor(props) {
        super(props);
    }
    render() {
        return ( 
            <div class="modal fade" id={"restartModal" + this.props.service.svcID} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Restart service</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body" dangerouslySetInnerHTML={{ __html: this.props.service.restart_steps }}>
                </div>
                <div class="modal-footer">
                   <button type="button" data-dismiss="modal" class="btn btn-primary" onClick={() => this.props.restart(this.props.service.svcID)}>Restart</button>
                </div>
              </div>
            </div>
          </div>
        )
    }
  
}

export default RestartModal;