
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import GenericButton from "../../../components/GenericButton";

export default function DeleteButton({ itemId, deleteItem }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteItemAndReload = useCallback(() => {
    handleClose();
    deleteItem(itemId);
  }, [itemId, deleteItem])

  return (
    <>
      <Link onClick={handleShow} className="text-decoration-none">
        <GenericButton btnName="Delete" className="btn-danger" />
      </Link>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete this record?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" type="submit" onClick={deleteItemAndReload}>
            Delete
          </Button>
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
