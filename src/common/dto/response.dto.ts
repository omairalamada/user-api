export class ResponseDto<T> {
    readonly message?: string

    readonly data: T
}
