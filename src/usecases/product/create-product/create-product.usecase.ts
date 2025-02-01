import { ProductEntity } from "../../../domains/product/entities/product.entity";
import { ProductGateway } from "../../../domains/product/gateway/product.gateway";
import { UseCase } from "../../usecase";

export interface CreateProductInputDto {
    name : string
    price : number
}

export interface CreateProductOutputDto {
    id : string
}

export class CreateProductUseCase implements UseCase<CreateProductInputDto, CreateProductOutputDto> {

    private constructor(private readonly productGateway : ProductGateway) {}

    public static build(productGateway : ProductGateway) {
        return new CreateProductUseCase(productGateway)
    }

    public async execute(input: CreateProductInputDto): Promise<CreateProductOutputDto> {
        const aProduct : ProductEntity = ProductEntity.build(input.name, input.price)

        await this.productGateway.save(aProduct)

        return this.presentOutput(aProduct)
    }

    public presentOutput(product : ProductEntity) : CreateProductOutputDto {
        const output: CreateProductOutputDto = {
            id : product.id
        }

        return output
    }

}