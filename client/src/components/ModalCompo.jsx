/* eslint-disable react/prop-types */
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';

export default function ModalCompo({
  onApprove,
  showModel,
  header,
  body,
  positiveBtn,
  negativeBtn,
}) {
  const [openModel, setOpenModel] = useState(showModel);

  return (
    <>
      <Modal show={openModel} onClose={() => setOpenModel(false)}>
        {header && <Modal.Header>{header}</Modal.Header>}
        {body && (
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {body}
              </p>
            </div>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button onClick={onApprove}>
            {positiveBtn ? positiveBtn : 'Yes'}
          </Button>
          <Button color="gray" onClick={() => setOpenModel(false)}>
            <p>{negativeBtn ? negativeBtn : 'Cancel'}</p>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
