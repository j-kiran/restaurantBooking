/** @format */

import React, {useState, Fragment} from 'react';
import {Button, Modal, ModalBody} from 'reactstrap';
import AddBooking from './bookingForm/AddBooking';
import ContactEdit from './bookingForm/EditBooking'
import BookingList from './BookingList'

const AddModal = (props) => {
  const {className} = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <Fragment>
      <div>
        <Button className="add-booking" color='danger' onClick={toggle}>
          Book Table
        </Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalBody>
            <AddBooking toggle={toggle} />
          </ModalBody>
        </Modal>
        {/* <BookingList /> */}
      </div>
    </Fragment>
  );
};

export default AddModal;
