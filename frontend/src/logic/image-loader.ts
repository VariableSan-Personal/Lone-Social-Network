export const imageLoader = (event: Event, callback: Function) => {
  const el = event.currentTarget as HTMLInputElement

  const fileList: FileList | null = el.files

  if (fileList) {
    const file = fileList.item(0)
    const fileExt = file?.name.slice(file.name.lastIndexOf('.'))

    const allowedExtensions = ['png', 'jpeg', 'jpg']

    if (allowedExtensions.includes(fileExt?.slice(1) || '')) {
      const reader = new FileReader()
      reader.readAsDataURL(file as Blob)

      reader.onload = (progressEvent: ProgressEvent<FileReader>) => {
        callback(progressEvent)
      }
    }
  }
}
