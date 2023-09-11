import { FieldError } from '@redwoodjs/forms'

import Button from 'src/components/Button/Button'
import { ICloudinaryUploadResultInfo } from '../Upload/Upload/Upload'

declare const cloudinary: unknown

interface IMediaLibraryProps {
  name: string
  handleMediaLibrary: (value: ICloudinaryUploadResultInfo[]) => void
}

const MediaLibrary = ({ name, handleMediaLibrary }: IMediaLibraryProps) => {

  const onClickOpen = () => {
    window.ml = cloudinary.openMediaLibrary(
      {
        cloud_name: 'dl5elpdjy',
        api_key: '929416121543777',
        username: 'nreliasar@gmail.com',
      },
      {
        insertHandler: function (data) {
          handleMediaLibrary(data.assets as ICloudinaryUploadResultInfo[])
        },
      },
      document.getElementById('media_library_widget')
    )
  }

  return (
    <>
      <Button
        id="media_library_widget"
        title="Media library"
        className="rw-button rw-button-blue mt-4"
        onClick={onClickOpen}
        text='Select from Media Library'
      />
      <FieldError name="upload" className="rw-field-error" />
    </>
  )
}

export default MediaLibrary
