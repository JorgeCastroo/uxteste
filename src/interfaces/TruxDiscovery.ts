export interface TruxDiscoveryLogin {
    access_token: string,
}

export interface TruxDiscovery {
    codigoAcesso: string | null,
    nomeCliente: string,
    urlRouting: string,
    tokenRouting: string,
    urlApiMobile: string,
    urlApiTms: string,
    tokenTms: string,
    versaoCodigoMobile: string,
    idTransportadora: string,
    DistanciaLimite: string,
    S3AcessKey: string,
    S3Bucket: string,
    S3Directory: string,
    S3SecretKey: string,
    FirstMileApiMobile: string,
    FirstMileApiKey:string
}