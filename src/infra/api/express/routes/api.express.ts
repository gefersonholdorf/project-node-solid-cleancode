import { Api } from "../../api";
import express, { Express, json, Router } from "express";
import { Route } from "./route";

export class ApiExpress implements Api {
    private app : Express

    private constructor(private readonly routes : Route[]) {
        this.app = express()
        this.app.use(json())
        this.addRoutes(routes)
    }

    public static build(routes : Route[]) {
        return new ApiExpress(routes)
    }

    private addRoutes(routes : Route[]) {
        routes.forEach((route) => {
            const path = route.getPath()
            const method = route.getMethod()
            const handler = route.getHandle()

            this.app[method](path, handler)
        })
    }

    public start(port : number) {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    }
}