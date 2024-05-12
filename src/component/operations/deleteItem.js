import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostListItem(props) {
    const user = useSelector(store => store.auth.user);
    const [showModal, setShowModal] = useState(false);

    function deleteItem() {
        axios.delete('https://medicalstore.mashupstack.com/api/medicine/'+props.medicine.id,{
            headers:{'Authorization':"Bearer "+ user.token}}).then(response=>{
                alert(response.data.message)
                props.refresh();
                setShowModal(false);
        })
            .catch(error => {
                console.error('Error deleting medicine:', error);
                setShowModal(false);
            });
    }

    return (
        <div className="card">
            <div className="card-body">
                {props.medicine.name}
                <button className="btn btn-danger float-right" onClick={() => setShowModal(true)}>
                    Delete
                </button>
                <Link to={`/medicines/${props.medicine.id}/edit`} className="btn btn-primary float-right mr-2">Edit</Link>
                <Link to={`/medicines/${props.medicine.id}`} className="btn btn-info float-right mr-2">View</Link>
                {showModal && (
                    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirm Deletion</h5>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Are you sure you want to delete this medicine from the list?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-white" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={deleteItem}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostListItem;