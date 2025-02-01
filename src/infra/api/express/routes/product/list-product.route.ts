import { Request, Response } from "express"
import { ListProductOutputDto, ListProductUseCase } from "../../../../../usecases/product/list-product/list-product"
import { HttpMethod, Route } from "../route"

export interface ListProductResponseDto {
    products: {
        id : string
        name : string
        price : number
    }[]
}

export class ListProductRoute implements Route {
    
    private constructor(
        private readonly path : string,
        private readonly method : HttpMethod,
        private readonly listProductService : ListProductUseCase
    ) {}

    
    public static build(listProductService : ListProductUseCase) {
        return new ListProductRoute(
            '/products',
            'get',
            listProductService
        )
    }
    
    getHandle(): (request: Request, response: Response) => Promise<void> {
        return async (request : Request, response : Response) => {
            const output = await this.listProductService.execute()

            const responseBody = this.present(output)

            response.status(200).json(responseBody).send()
        }
    }

    private present(input : ListProductOutputDto) : ListProductResponseDto {
        const response : ListProductResponseDto = {
            products: input.products.map((p) => ({
                id : p.id,
                name: p.name,
                price: p.price
            }))
        }

        return response
    }

    getPath(): string {
        return this.path
    }
    getMethod(): HttpMethod {
        return this.method
    }
   
}