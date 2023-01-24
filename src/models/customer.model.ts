export interface CustomerModel {
    id: string
    documentType: DocumentType
    document: string
    fullName: string
    email: string
    phone: string
    password: string
    avatarUrl?: string
    state: boolean
    deletedAt?: Date | number

}