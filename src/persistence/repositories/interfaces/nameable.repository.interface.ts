export interface INameable<T> {

    findByName(name: string): T[]

}