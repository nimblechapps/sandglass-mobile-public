import { Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';

export const pickDocument = (allFiles, callback) => {
    const fileType = [DocumentPicker.types.allFiles]
    DocumentPicker.pick({
        type: fileType,
    }).then(res => {
        if (res.length > 0) {
            const uri = res[0].uri;
            const name = res[0].name;
            const type = res[0].type;
            const pdfFile = { uri, name, type };
            callback && callback(pdfFile)
        } else {
            callback && callback(null)
        }

    }).catch(e => {
        Alert.alert(e.message ? e.message : e);
    });
}

export const pickImage = (options, isCamera, callback) => {
    if (isCamera) {
        ImagePicker.openCamera(options).then(image => {
            const uri = image.path;
            const filePath = image.path.split('/');
            const name = filePath[filePath.length - 1];
            const type = image.mime;
            const imageFile = { uri, name, type };
            callback && callback(imageFile);
        }).catch(e => {
            Alert.alert(e.message ? e.message : e);
        });
    } else {
        ImagePicker.openPicker(options).then(image => {
            const uri = image.path;
            const filePath = image.path.split('/');
            const name = filePath[filePath.length - 1];
            const type = image.mime;
            const imageFile = { uri, name, type };
            callback && callback(imageFile);
        }).catch(e => {
            Alert.alert(e.message ? e.message : e);
        });
    }
}