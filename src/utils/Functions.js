import { setValue, getValue, keyNames } from "../utils/Storage";
import ImagePicker from 'react-native-image-crop-picker';
export const getHeaderConfig = async (token) => {
  let newToken
  if (!token) {
    newToken = await getValue(keyNames.token)
  }


  let config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + newToken
    }
  }

  return config

}

const getToken = async () => {
  return await getValue(keyNames.token)
}

export const onLaunchGallery = (block) => {
  ImagePicker.openPicker({
    compressImageMaxWidth: 200,
    compressImageMaxHeight: 200,
    width: 200,
    height: 200,
    writeTempFile: false,
    cropping: true,
    includeBase64: true,
    cropperChooseText: 'Conferma',
    cropperCancelText: 'Annulla',
    avoidEmptySpaceAroundImage: false,
    cropperCircleOverlay: true
  }).then((image) => {
    // console.log("image    ", image)
    block(image);
  });
};

export const onLaunchCamera = (block) => {
  ImagePicker.openCamera({
    compressImageMaxWidth: 200,
    compressImageMaxHeight: 200,
    width: 200,
    height: 200,
    writeTempFile: false,
    cropping: true,
    includeBase64: true,
    cropperCircleOverlay: true,
    useFrontCamera: true,
    cropperChooseText: 'Conferma',
    cropperCancelText: 'Annulla',
    mediaType: 'photo'
  }).then((image) => {
    block(image);
  });
};

export const carBrands =
  [
    { label: 'ΟΛΑ', value: 'ΟΛΑ' },
    { label: 'OPEL', value: 'OPEL' },
    { label: 'CITROËN', value: 'CITROËN' },
    { label: 'HYUNDAI', value: 'HYUNDAI' },
    { label: 'AUDI', value: 'AUDI' },

    { label: 'HONDA', value: 'HONDA' },
    { label: 'BMW', value: 'BMW' },
    { label: 'NISSAN', value: 'NISSAN' },
    { label: 'FIAT', value: 'FIAT' },
    { label: 'FORD', value: 'FORD' },

    { label: 'SMART', value: 'SMART' },
    { label: 'MERCEDES-BENZ', value: 'MERCEDES-BENZ' },
    { label: 'RENAULT', value: 'RENAULT' },
    { label: 'MAZDA', value: 'MAZDA' },
    { label: 'MITSUBISHI', value: 'MITSUBISHI' },
    { label: 'ALFA ROMEO', value: 'ALFA ROMEO' },
    { label: 'SEAT', value: 'SEAT' },
    { label: 'SUZUKI', value: 'SUZUKI' },
    { label: 'ΑΛΛΟ', value: 'ΑΛΛΟ' }

  ]


