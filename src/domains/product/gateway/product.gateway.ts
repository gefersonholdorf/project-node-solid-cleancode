import { ProductEntity } from "../entities/product.entity";

export interface ProductGateway {
    save(product : ProductEntity) : Promise<void>

    list() : Promise<ProductEntity[]>
}