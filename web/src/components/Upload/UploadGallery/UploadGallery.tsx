import { FieldError, Label, TextField } from '@redwoodjs/forms'

import Upload from '../Upload/Upload'

interface IUploadProps {
  // folder?: string
  // setFolder?: (value) => void
  setImageGalleries?: (value) => void
}

const UploadGallery = ({
  // folder,
  // setFolder,
  setImageGalleries,
}: IUploadProps) => {
  return (
    <>
      {/* <Label
        name="folder"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Set the folder name for this image gallery
      </Label>

      <TextField
        name="folder"
        defaultValue={folder}
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        onChange={(e) => {
          setFolder(e.target.value ? e.target.value : 'Album')
        }}
        validation={{ required: false }}
      />

      <FieldError name="title" className="rw-field-error" /> */}

      {/* {folder && ( */}
      <Upload
        name="imageGalleries"
        multiple={true}
        // folder={folder}
        handleUpload={setImageGalleries}
      />
      {/* )} */}
    </>
  )
}

export default UploadGallery
