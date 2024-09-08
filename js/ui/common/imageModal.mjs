export function createImageModal() {
  const modal = document.createElement("div");
  modal.classList.add("modal", "fade");
  modal.id = "imageModal";
  modal.tabIndex = "-1";
  modal.setAttribute("aria-labelledby", "imageModalLabel");
  modal.setAttribute("aria-hidden", "true");

  const modalDialog = document.createElement("div");
  modalDialog.classList.add("modal-dialog");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");

  const modalTitle = document.createElement("h5");
  modalTitle.classList.add("modal-title");
  modalTitle.id = "imageModalLabel";
  modalTitle.textContent = "Full Image";

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.classList.add("btn-close");
  closeButton.setAttribute("data-bs-dismiss", "modal");
  closeButton.setAttribute("aria-label", "Close");

  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);

  const modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");
  const modalImage = document.createElement("img");
  modalImage.classList.add("img-fluid");
  modalImage.id = "modalImage"; // We'll use this to set the clicked image's src
  modalBody.appendChild(modalImage);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog);

  document.body.appendChild(modal); // Append the modal to the body
}
