
import SparkMD5 from 'spark-md5'
import { Toast} from "@nutui/nutui";

const uploadFile = (file, callBack) => {
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    Toast.fail('上传头像图片大小不能超过 2MB!')
    return false
  }
  const isJPG =
    ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'].indexOf(
      file.type
    ) === -1
  if (isJPG) {
    Toast.fail('上传头像图片只能是 jpeg/jpg/png/gif格式!')
    return false
  }

  const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
  const chunkSize = 2097152
  const chunks = Math.ceil(file.size / chunkSize)
  let currentChunk = 0
  const spark = new SparkMD5.ArrayBuffer()
  const fileReader = new FileReader()

  fileReader.onload = (e) => {
    spark.append(e.target.result)
    currentChunk++
    if (currentChunk < chunks) {
      return false
    } else {
      callBack({md5:spark.end(),file:file})
    }
  }
  fileReader.onerror = function() {
    console.warn('oops, something went wrong.')
  }
  function loadNext() {
    const start = currentChunk * chunkSize
    const end = start + chunkSize >= file.size ? file.size : start + chunkSize
    fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
  }
  loadNext()
}


export default uploadFile