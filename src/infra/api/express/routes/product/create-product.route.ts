import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { CreateProductInputDto, CreateProductUseCase } from "../../../../../usecases/product/create-product/create-product.usecase";

export interface CreateProductResponseDto {
    id : string
}

export class CreateProductRoute implements Route {

    private constructor(
        private readonly path : string,
        private readonly method : HttpMethod,
        private readonly createProductService : CreateProductUseCase
    ) {}

    public static build(createProductService : CreateProductUseCase) {
        return new CreateProductRoute(
            '/create-product',
            'post',
            createProductService
        )
    }

    public getHandle() {
        
        return async (request : Request, response : Response) => {
            const {name, price} = request.body

            const input : CreateProductInputDto = {
                name, price
            }

            const responseBody : CreateProductResponseDto = await this.createProductService.execute(input)

            response.status(201).json(responseBody)
        }
    }
    getPath(): string {
        return this.path
    }
    getMethod(): HttpMethod {
        return this.method
    }

}