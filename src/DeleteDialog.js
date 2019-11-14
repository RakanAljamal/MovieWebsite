import React, { Component } from 'react';
import './deleteDialog.css'
class DeleteDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteDialog: this.props.deleteDialog
        };
    }
    handleCancel = () => {
        this.props.cancel(true)
    }
    handleDelete = () => {
        this.props.delete(this.props.movieId)
    }
    render() {
        return (
            this.props.deleteDialog &&
            <div className='whole-page'>
                <div className="delete-dialog">
                    <h1>Are you sure you want to delete?</h1>
                    <div className="options">
                        <h1 onClick={this.handleCancel} className="btn-cancel">Cancel</h1>
                        <h1 onClick={this.handleDelete} className="btn-delete">Delete</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteDialog;