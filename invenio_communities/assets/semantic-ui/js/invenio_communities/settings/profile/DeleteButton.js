/*
 * This file is part of Invenio.
 * Copyright (C) 2016-2021 CERN.
 * Copyright (C) 2021 Northwestern University.
 *
 * Invenio is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { i18next } from "@translations/invenio_communities/i18next";
import React, { useEffect, useState } from "react";
import { Button, Icon, Modal } from "semantic-ui-react";

export const DeleteButton = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const cancelBtnRef = React.createRef();
  const openModalBtnRef = React.createRef();

  const handleOpen = () => setModalOpen(true);

  const handleClose = () => {
    setModalOpen(false);
    openModalBtnRef?.current?.focus();
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await props.onDelete();
      if (props.redirectURL) {
        window.location.href = props.redirectURL;
      }
    } catch (error) {
      props.onError(error);
    }
    handleClose();
  };

  useEffect(() => {
    if (modalOpen) cancelBtnRef?.current?.focus();
  }, [modalOpen]);

  return (
    <>
      <Button
        ref={openModalBtnRef}
        compact
        negative
        onClick={handleOpen}
        fluid
        icon
        labelPosition="left"
        type="button"
        aria-haspopup="dialog"
        aria-controls="warning-modal"
        aria-expanded={modalOpen}
        id="delete-button"
      >
        <Icon name="trash"></Icon>
        {props.label}
      </Button>

      <Modal
        id="warning-modal"
        role="dialog"
        aria-labelledby="delete-button"
        open={modalOpen}
        onClose={handleClose}
        size="tiny"
      >
        <Modal.Content>{props.confirmationMessage}</Modal.Content>
        <Modal.Actions>
          <Button
            ref={cancelBtnRef}
            onClick={handleClose}
            loading={loading}
            floated="left"
          >
            {i18next.t("Cancel")}
          </Button>
          <Button negative onClick={handleDelete} loading={loading}>
            {i18next.t("Delete")}
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};
