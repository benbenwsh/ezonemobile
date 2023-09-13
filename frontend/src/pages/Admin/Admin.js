import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Container, Button } from "react-bootstrap";
import { BACKEND_URL } from "../../config";

export function Admin({authenticate}) {

  useEffect(() => {
    authenticate()
  }, [authenticate])

  return (
    <Container style={{display: "flex", justifyContent: "center", padding: 32}}>
      <Button href="admin/upload" variant="primary" style={{marginRight: 4}}>Upload</Button>
      <Button href="admin/delete" variant="primary">Delete</Button>
    </Container>
  );
}
