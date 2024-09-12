export type TFile = {
    id: string;
    mimetype: string;
    filename: string;
    data: Buffer;
};

export type TFileUploadResponse = {
    path: string;
};

export type TFileUpload = Omit<TFile, 'id'>;
