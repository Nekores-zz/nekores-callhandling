/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author : geekbytes.io [0xff@geekbytes.io]
 *
 */

const handleFileUpload = options => files => {
  const { getFileUploadMeta, onComplete, onBeforeUpload, onAfterUpload } = options;
  const fileUploadMeta = getFileUploadMeta();
  const formData = new FormData();
  files.forEach((file, index) => {
    formData.append(fileUploadMeta.fieldName, file);
  });
  const xhr = new XMLHttpRequest();
  xhr.open("POST", fileUploadMeta.apiUrl, options.async || true);
  fileUploadMeta.headers &&
    fileUploadMeta.headers.forEach(header => {
      xhr.setRequestHeader(header.name, header.value);
    });

  if (onComplete) {
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        onComplete(xhr.status === 200, xhr.response);
      }
    };
  }

  onBeforeUpload && onBeforeUpload(files, xhr, formData);

  console.log(formData);
  xhr.send(formData);

  onAfterUpload && onAfterUpload(files, xhr, formData);
};

export { handleFileUpload };
