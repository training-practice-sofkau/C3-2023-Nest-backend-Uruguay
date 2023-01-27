export interface IDisableable<T> {

    findByState(state: boolean): T[]

}