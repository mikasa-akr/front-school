import { Modal, ModalOverlay, ModalContent, ModalBody, Image } from "@chakra-ui/react";
function FileModal({ isOpen, onClose, fileUrl }) {
return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
        <Image src={`/home/shayma/PFE/my-app/src/assets/${fileUrl}`} alt="File" />
                </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export default FileModal;