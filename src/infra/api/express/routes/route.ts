import { Request, Response } from "express"

export type HttpMethod = "get" | "post"

export const HttpMethod = {
    get: "get" as HttpMethod,
    post: "post" as HttpMethod
}

export interface Route {
    getHandle() : (request : Request, response : Response) => Promise<void>
    getPath() : string,
    getMethod() : HttpMethod
}