import { ProductEntity } from "../../../domains/product/entities/product.entity"
import { ProductGateway } from "../../../domains/product/gateway/product.gateway"
import { UseCase } from "../../usecase"

export interface ListProductOutputDto {
    products: {
        id : string
        name : string
        price : number
        quantity : number
    }[]
}

export class ListProductUseCase implements UseCase<void, ListProductOutputDto> {

    private constructor(private readonly productGateway : ProductGateway) {}

    public static build(productGateway : ProductGateway) {
        return new ListProductUseCase(productGateway)
    }
 
    public async execute(): Promise<ListProductOutputDto> {
        const products = await this.productGateway.list()

        const output = this.presentOutput(products)

        return output
    }

    private presentOutput(products : ProductEntity[]) : ListProductOutputDto {
        
        return {
            products: products.map((p) => {
                return {
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    quantity: p.quantity
                }
            })
        }
    }

}