export class UploadAdapter {
    private loader;
    constructor(loader: any) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file
            .then( (file: File) => new Promise( ( resolve ) => {
                let myReader= new FileReader();
                myReader.onloadend = () => {
                    resolve({ default: myReader.result });
                }
                myReader.readAsDataURL(file);
            } ) );
    };

}